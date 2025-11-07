import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = request.headers.get('authorization');

    console.log('Transaction API called');
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      if (key === 'order_id') {
        console.log('order_id received:', value, 'type:', typeof value);
      }
    }

    if (!token) {
      console.log('No authorization token provided');
      return NextResponse.json({ error: 'No authorization token' }, { status: 401 });
    }

    // Check if this is a file upload request
    const receiptImage = formData.get('receipt_image');
    const hasFile = receiptImage && receiptImage instanceof File;

    if (hasFile) {
      // For file uploads, we need to handle the database schema issue
      // The backend is missing the 'file_name' column in the api_transaction table
      
      // Create a new FormData without the problematic fields
      const cleanFormData = new FormData();
      
      // Copy all fields except those that might cause database issues
      for (const [key, value] of formData.entries()) {
        if (key !== 'file_name') { // Skip file_name if it exists
          cleanFormData.append(key, value);
        }
      }

      // Forward the cleaned request to the external API
      const response = await fetch('https://api.valor-games.co/api/transactions/create/', {
        method: 'POST',
        headers: {
          'Authorization': token,
        },
        body: cleanFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('External API error:', errorText);
        
        // Check if it's the specific database schema error
        if (errorText.includes('file_name') && errorText.includes('no column')) {
          return NextResponse.json(
            { 
              error: 'Database schema issue', 
              message: 'The backend database is missing the required file_name column. Please contact the backend team to update the database schema.',
              details: 'The api_transaction table needs a file_name column added.'
            },
            { status: 500 }
          );
        }
        
        return NextResponse.json(
          { error: 'Failed to create transaction', details: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    } else {
      // For non-file requests, proceed normally
      console.log('Making request to external API for non-file transaction');
      const response = await fetch('https://api.valor-games.co/api/transactions/create/', {
        method: 'POST',
        headers: {
          'Authorization': token,
        },
        body: formData,
      });

      console.log('External API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('External API error:', errorText);
        return NextResponse.json(
          { error: 'Failed to create transaction', details: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log('External API success:', data);
      return NextResponse.json(data);
    }

  } catch (error) {
    console.error('Transaction creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}