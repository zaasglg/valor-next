import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    console.log('Raw body:', rawBody)
    console.log('Headers:', Object.fromEntries(req.headers.entries()))

    let json: any = null
    try {
      json = JSON.parse(rawBody)
    } catch (_) {
      console.error('JSON parse failed:', rawBody)
      return new NextResponse('Invalid JSON', { status: 400 })
    }

    console.log('Webhook received:', json?.event)
    console.log('Full payload:', JSON.stringify(json, null, 2))

    if (!json || !json.event) {
      return new NextResponse('Missing Event', { status: 400 })
    }

    const {reference, status, amount, currency} =json?.data;

    const validStatuses = ['finished', 'paid', 'confirmed', 'failed', 'refunded', 'success']
    if (!validStatuses.includes(status)) {
      console.warn('Unknown status:', status)
    }

    // const secret = 'gzcaz1b4_yhb9nl7f'
    // const receivedSign = json.sign
    //
    // if (receivedSign) {
    //   const dataToVerify = { ...json }
    //   delete dataToVerify.sign
    //
    //   const sortedKeys = Object.keys(dataToVerify).sort()
    //   const signString = sortedKeys.map(key => dataToVerify[key]).join(':')
    //   const calculatedSign = crypto.createHmac('sha256', secret).update(signString).digest('hex')
    //
    //   console.log('Signature verification:', { receivedSign, calculatedSign, signString })
    //
    //   if (receivedSign !== calculatedSign) {
    //     console.error('Invalid signature')
    //     return new NextResponse('Invalid signature', { status: 403 })
    //   }
    // } else {
    //   console.warn('No signature provided - skipping verification (dev mode)')
    // }

    if (status === 'success') {
      try {
        const callbackPayload = {
          orderid: reference,
          transaccion_number: reference,
          order_id: reference,
          status: status,
          amount: amount.toString() || '0',
          currency: currency || 'COP',
          time: json.time?.toString() || Date.now().toString()
        }
        
        console.log('Sending to payment-callback:', JSON.stringify(callbackPayload))
        
        const callbackResponse = await fetch('https://api.valor-games.co/api/payment-callback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(callbackPayload)
        })

        if (!callbackResponse.ok) {
          const errorText = await callbackResponse.text()
          console.error('Callback failed:', callbackResponse.status, errorText)
          return new NextResponse('Callback failed', { status: 500 })
        }

        const successData = await callbackResponse.json()
        console.log('Callback success:', successData)
      } catch (err) {
        console.error('Callback error:', err)
        return new NextResponse('Callback error', { status: 500 })
      }
    } else if (json.status === 'failed' || json.status === 'expired' || json.status === 'refunded') {
      console.log(`Payment ${json.orderid} ${json.status}, removing from history`)
      try {
        const cleanupResponse = await fetch('https://api.valor-games.co/api/cleanup-payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderid: json.orderid,
            transaccion_number: json.orderid,
          })
        })
        
        if (cleanupResponse.ok) {
          console.log('Payment cleaned up successfully')
        } else {
          console.warn('Failed to cleanup payment:', await cleanupResponse.text())
        }
      } catch (err) {
        console.error('Cleanup error:', err)
      }
    }

    console.log('===== WEBHOOK END (OK) =====')
    return new NextResponse('OK', { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    console.error('Stack:', err instanceof Error ? err.stack : 'No stack')
    return NextResponse.json({ error: 'webhook_error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'webhook alive' })
}