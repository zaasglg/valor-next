import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    
    // Здесь можно добавить логику для получения данных пользователя
    // и интеграции с основной базой данных
    
    return NextResponse.json({
        success: true,
        userId: userId,
        message: 'Chicken Road API endpoint'
    })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        
        // Здесь можно добавить логику для обработки ставок
        // и интеграции с основной системой
        
        return NextResponse.json({
            success: true,
            data: body,
            message: 'Bet processed successfully'
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}
