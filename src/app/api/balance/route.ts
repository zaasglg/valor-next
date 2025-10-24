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
        const authHeader = request.headers.get('authorization')
        
        if (!authHeader) {
            return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 })
        }

        const body = await request.json()
        const { newBalance, transactionId, type } = body
        
        if (newBalance === undefined) {
            return NextResponse.json({ error: 'Missing newBalance field' }, { status: 400 })
        }

        // Actualizar el balance en el servidor Ubuntu
        const response = await fetch('https://api.valor-games.co/api/user/update_balance/', {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deposit: newBalance,
                transaction_id: transactionId,
                type: type || 'manual_update'
            })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('External API error:', response.status, response.statusText, errorData)
            return NextResponse.json(
                { 
                    error: 'Failed to update balance on external API',
                    details: errorData
                },
                { status: response.status }
            )
        }

        const data = await response.json()
        
        return NextResponse.json({
            success: true,
            userId: data.user_id,
            newBalance: data.deposit || newBalance,
            transactionId: transactionId,
            updatedAt: Date.now()
        })
    } catch (error) {
        console.error('Error updating balance:', error)
        return NextResponse.json(
            { 
                error: 'Failed to update balance',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
