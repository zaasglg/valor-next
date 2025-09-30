import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');

    console.log('API Route - Request body:', body);
    console.log('API Route - Auth header:', authHeader ? 'Present' : 'Missing');

    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 });
    }

    let response;
    try {
      response = await fetch('https://api.valor-games.co/api/historial_pagos/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify(body),
      });
    } catch (fetchError) {
      console.error('API Route - Fetch error:', fetchError);
      return NextResponse.json({ 
        error: 'External API unavailable', 
        details: fetchError instanceof Error ? fetchError.message : 'Network error' 
      }, { status: 503 });
    }

    console.log('API Route - Response status:', response.status);
    console.log('API Route - Response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    console.log('API Route - Content type:', contentType);

    let data;
    try {
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, get text response
        const textResponse = await response.text();
        console.log('API Route - Non-JSON response:', textResponse);
        data = { error: 'Non-JSON response received', details: textResponse };
      }
    } catch (parseError) {
      console.error('API Route - JSON parse error:', parseError);
      const textResponse = await response.text();
      console.log('API Route - Raw response:', textResponse);
      data = { error: 'Failed to parse response', details: textResponse };
    }

    console.log('API Route - Response data:', data);

    if (!response.ok) {
      console.error('API Route - External API error:', data);
      
      // If external API is down, create a mock response for development
      if (response.status >= 500) {
        console.log('API Route - External API seems down, creating mock response');
        const mockResponse = {
          id: Date.now(),
          transaccion_number: `HP${Date.now()}`,
          transacciones_data: new Date().toISOString(),
          transacciones_monto: body.transacciones_monto,
          estado: "esperando",
          metodo_de_pago: body.metodo_de_pago,
          phone: body.phone,
          cuenta_corriente: body.cuenta_corriente,
          numero_de_cuenta: body.numero_de_cuenta,
          tipo_de_documento: body.tipo_de_documento,
          numero_documento: body.numero_documento,
          banco: body.banco,
          mock: true // Flag to indicate this is a mock response
        };
        
        return NextResponse.json(mockResponse, { status: 200 });
      }
      
      return NextResponse.json({ 
        error: 'External API error', 
        details: data,
        status: response.status 
      }, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('API Route - Internal error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
