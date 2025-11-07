import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const mkey = 1774;
        const secret = 'gzcaz1b4_yhb9nl7f';

        // Validate required fields
        const requiredFields = [
            'first_name', 'last_name', 'address', 'country', 'state',
            'city', 'zip', 'birth_date', 'email', 'phone_no', 'amount', 'currency', 'tax_id'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Validate amount is a number
        const amount = parseFloat(body.amount);
        if (isNaN(amount) || amount <= 0) {
            return NextResponse.json(
                { error: `Invalid amount: ${body.amount}` },
                { status: 400 }
            );
        }

        // Create request parameters - keep original format for signature
        const requestParam = {
            first_name: String(body.first_name).trim(),
            last_name: String(body.last_name).trim(),
            address: String(body.address).trim(),
            orderid: String(body.order_id || Date.now()).trim(), // Use order_id from request if provided
            country: String(body.country || 'CO').trim(),
            state: String(body.state).trim(),
            city: String(body.city).trim(),
            zip: String(body.zip).trim(),
            ip_address: String(body.ip_address || '186.168.118.183').trim(),
            birth_date: String(body.birth_date).trim(),
            email: String(body.email).trim(),
            phone_no: String(body.phone_no).trim(),
            amount: String(body.amount).trim(),
            currency: 'cop',
            tax_id: String(body.tax_id).trim()
        };

        // Create signature using PHP-compatible method
        const sortedKeys = Object.keys(requestParam).sort();
        
        // PHP uses implode(':', array_values) - just values, no keys
        const signString = sortedKeys
            .map(key => requestParam[key as keyof typeof requestParam])
            .join(':');

        const signature = crypto
            .createHmac('sha256', secret)
            .update(signString)
            .digest('hex');

        // Add signature to request
        const finalRequestParam = {
            ...requestParam,
            co_sign: signature
        };

        console.log('=== PAGOS API DEBUG ===');
        console.log('Original Body:', JSON.stringify(body, null, 2));
        console.log('Request Params:', JSON.stringify(requestParam, null, 2));
        console.log('Sorted Keys:', sortedKeys);
        console.log('Sign String:', signString);
        console.log('Signature:', signature);
        console.log('Final Request:', JSON.stringify(finalRequestParam, null, 2));

        // Make request to CF24Pay API
        const response = await fetch('https://wallet.cf24pay.com/createorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-Mkey': mkey.toString()
            },
            body: JSON.stringify(finalRequestParam)
        });

        console.log('CF24Pay Response Status:', response.status);
        console.log('CF24Pay Response Headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('CF24Pay API Error Response:', errorText);

            return NextResponse.json(
                {
                    error: `CF24Pay API error: ${response.status}`,
                    details: errorText,
                    request: finalRequestParam
                },
                { status: response.status }
            );
        }

        const result = await response.json();
        console.log('CF24Pay API Response:', result);

        return NextResponse.json(result);

    } catch (error) {
        console.error('Pagos API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}