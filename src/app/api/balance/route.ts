import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        
        if (!authHeader) {
            return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 })
        }

        // Получаем реальный баланс из основного API
        const response = await fetch('https://api.valor-games.co/api/user/info', {
            headers: {
                'Authorization': authHeader,
            },
        })

        if (!response.ok) {
            console.error('External API error:', response.status, response.statusText)
            return NextResponse.json(
                { error: 'Failed to fetch user info from external API' },
                { status: response.status }
            )
        }

        const data = await response.json()
        
        // Используем currency из country_info, если он есть, иначе fallback на currency из user/info
        const currencyFromCountry = data.country_info?.currency
        const currencyFromUser = data.currency
        const currency = (currencyFromCountry && currencyFromCountry.trim()) || 
                        (currencyFromUser && currencyFromUser.trim()) || 
                        '$'
        
        return NextResponse.json({
            success: true,
            userId: data.user_id || data.id,
            balance: data.deposit || 0,
            currency: currency,
            lastUpdated: Date.now()
        })
    } catch (error) {
        console.error('Error fetching balance:', error)
        return NextResponse.json(
            { error: 'Failed to fetch balance' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { userId, newBalance, transactionId } = body
        
        if (!userId || newBalance === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Здесь можно добавить логику для обновления баланса в БД
        // и отправки уведомлений через WebSocket или Server-Sent Events
        
        return NextResponse.json({
            success: true,
            userId: userId,
            newBalance: newBalance,
            transactionId: transactionId,
            updatedAt: Date.now()
        })
    } catch (error) {
        console.error('Error updating balance:', error)
        return NextResponse.json(
            { error: 'Failed to update balance' },
            { status: 500 }
        )
    }
}
