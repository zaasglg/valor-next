import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    let json: any = null
    try {
      json = JSON.parse(rawBody)
    } catch (_) {
      return new NextResponse('Invalid JSON', { status: 400 })
    }

    console.log('Webhook received:', json?.orderid, json?.status)

    if (!json || !json.orderid) {
      return new NextResponse('Missing orderid', { status: 400 })
    }

    const validStatuses = ['finished', 'paid', 'confirmed', 'failed', 'refunded', 'expired']
    if (!validStatuses.includes(json.status)) {
      console.warn('Unknown status:', json.status)
    }

    const secret = 'gzcaz1b4_yhb9nl7f'
    const receivedSign = json.sign
    
    if (receivedSign) {
      const dataToVerify = { ...json }
      delete dataToVerify.sign
      
      const sortedKeys = Object.keys(dataToVerify).sort()
      const signString = sortedKeys.map(key => dataToVerify[key]).join(':')
      const calculatedSign = crypto.createHmac('sha256', secret).update(signString).digest('hex')
      
      console.log('Signature verification:', { receivedSign, calculatedSign, signString })
      
      if (receivedSign !== calculatedSign) {
        console.error('Invalid signature')
        return new NextResponse('Invalid signature', { status: 403 })
      }
    } else {
      console.warn('No signature provided - skipping verification (dev mode)')
    }

    if (json.status === 'finished' || json.status === 'paid' || json.status === 'confirmed') {
      try {
        const callbackPayload = {
          orderid: json.orderid,
          status: json.status,
          amount: json.amount?.toString() || '0',
          currency: json.currency || 'COP',
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
    }

    return new NextResponse('OK', { status: 200 })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'webhook_error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'webhook alive' })
}
