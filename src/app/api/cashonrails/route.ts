import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const BASEURL = 'https://mainapi.cashonrails.com/api/v1/s2s';
const SECRETKEY = 'sk_test_i4etlpi7eucwdxonism19cxy6chfkykdfg6jsoe';
const BANKTRANSFER_BANK = 'bank78';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const requiredFields = [
            'first_name', 'last_name', 'country', 'email', 'amount','method','currency'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const amount = parseFloat(body.amount);
        if (isNaN(amount) || amount <= 0) {
            return NextResponse.json(
                { error: `Invalid amount: ${body.amount}` },
                { status: 400 }
            );
        }

        const ref ="vl"+ generateRandomString(16);

        let requestParam ={
            email: String(body.email).trim(),
            amount: String(body.amount).trim(),
            currency: String(body.currency).trim(),
            reference: ref,
            provider: BANKTRANSFER_BANK,
            bankCode:"",
            phone_number:"",
            code:"",
            card:""
        };

        let endpoint= "";

        if(body.method == "banktranfer"){
            requestParam.provider = BANKTRANSFER_BANK;
            endpoint="banktransfer";
        }

        if(body.method == "palmpay"){
            requestParam.bankCode = "100033";
            endpoint="paywithbank";
        }

        if(body.method == "momo"){
            requestParam.phone_number = String(body.momoNumber).trim();
            requestParam.code = "SAFKEN";
            endpoint="paywithmomo";
        }


        if(body.method == "card"){
            requestParam.card = String(body.card).trim();
            requestParam.reference = String(body.reference).trim();
            endpoint="card";
        }


        const response = await fetch(BASEURL+'/'+endpoint+'/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SECRETKEY}`
            },
            body: JSON.stringify(requestParam)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('CF24Pay error:', response.status, errorText);

            return NextResponse.json(
                {
                    error: `Cashonrails API error: ${response.status}`,
                    details: errorText,
                    request: requestParam
                },
                { status: response.status }
            );
        }

        const result = await response.json();

        console.log('Cashonrails response:', result);

        if(result.success){
            return NextResponse.json({
                order_id: ref,
                redirect_url: result?.redirect_url,
                ...result,
            });
        }else{
            return NextResponse.json(
                { error: result.message },
                { status: 500 }
            );
        }


    } catch (error) {
        console.error('Pagos API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export function generateRandomString(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}