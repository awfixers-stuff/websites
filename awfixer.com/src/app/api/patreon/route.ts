import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      { 
        error: 'Authentication has been removed from this application',
        user: null,
        subscription: null
      },
      { status: 410 }
    );
  } catch (error) {
    console.error('Error in Patreon data endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Patreon data' },
      { status: 500 }
    );
  }
}