import { NextResponse } from 'next/server';
import { sendInquiryEmail } from '@/lib/mail';

export async function POST(request) {
  try {
    const body = await request.json();
    await sendInquiryEmail(body, 'Project Inquiry');
    return NextResponse.json({ message: 'Project inquiry sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Mail delivery failed', details: error.message }, { status: 500 });
  }
}
