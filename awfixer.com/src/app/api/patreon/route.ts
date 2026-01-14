import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFreshPatreonData } from '@/lib/patreon';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the access token from the account data stored in cookies
    const cookies = request.headers.get('cookie') || '';
    const accountCookieMatch = cookies.match(/account=([^;]+)/);
    
    if (!accountCookieMatch) {
      return NextResponse.json(
        { error: 'No account data found' },
        { status: 400 }
      );
    }

    try {
      // Decode the account cookie to get access token
      const accountData = JSON.parse(
        Buffer.from(accountCookieMatch[1], 'base64').toString()
      );
      
      const accessToken = accountData.accessToken;
      
      if (!accessToken) {
        return NextResponse.json(
          { error: 'No access token found' },
          { status: 400 }
        );
      }

      // Fetch fresh Patreon data
      const patreonData = await getFreshPatreonData(accessToken);
      
      return NextResponse.json(patreonData);
    } catch (decodeError) {
      console.error('Error decoding account cookie:', decodeError);
      return NextResponse.json(
        { error: 'Invalid account data' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in Patreon data endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Patreon data' },
      { status: 500 }
    );
  }
}