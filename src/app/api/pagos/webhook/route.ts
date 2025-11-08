import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    let json: any = null
    try {
      json = JSON.parse(rawBody)
    } catch (_) {
    }

    console.log('Webhook received:', json?.orderid, json?.status)

    if (json && json.orderid && (json.status === 'finished' || json.status === 'paid')) {
      const secret = 'gzcaz1b4_yhb9nl7f'
      const receivedSign = json.sign
      delete json.sign
      
      const sortedKeys = Object.keys(json).sort()
      const signString = sortedKeys.map(key => json[key]).join(':')
      const calculatedSign = crypto.createHmac('sha256', signString, secret).digest('hex')
      
      if (receivedSign !== calculatedSign) {
        console.error('Invalid signature')
        return new NextResponse('Invalid signature', { status: 403 })
      }
      try {
        const callbackResponse = await fetch('https://api.valor-games.co/api/payment-callback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderid: json.orderid,
            status: json.status === 'finished' ? 'finished' : 'paid',
            amount: json.amount?.toString() || '0',
            currency: json.currency || 'COP',
            time: json.time?.toString() || Date.now().toString()
          })
        })

        if (!callbackResponse.ok) {
          const errorText = await callbackResponse.text()
          console.error('Callback failed:', callbackResponse.status, errorText)
        }
      } catch (err) {
        console.error('Callback error:', err)
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
