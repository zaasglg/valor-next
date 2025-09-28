import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        
        const response = await fetch('https://api.valor-games.co/api/historial_pagos/', {
            method: 'GET',
            headers: {
                'Authorization': authHeader || '',
            },
        });

        const data = await response.json();
        
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}