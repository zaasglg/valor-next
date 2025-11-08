import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    let json: any = null
    try {
      json = JSON.parse(rawBody)
    } catch (_) {
    }

    console.log('Webhook received:', json?.order_id, json?.status)

    if (json && json.order_id && json.status === 'paid') {
      try {
        const callbackResponse = await fetch('https://api.valor-games.co/api/payment-callback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderid: json.order_id,
            status: 'finished',
            amount: json.amount?.toString() || '0',
            currency: json.currency || 'COP',
            time: Date.now().toString()
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
