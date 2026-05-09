import { NextResponse } from 'next/server';
import { sendInquiryEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Save to Neon DB via Prisma
    try {
      await prisma.contact.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          subject: body.subject,
          message: body.message,
        }
      });
    } catch (dbError) {
      console.error('Database Error (Contact):', dbError);
      // Continue to email even if DB fails
    }

    // Send Email
    try {
      await sendInquiryEmail(body, 'Contact');
    } catch (mailError) {
      console.error('Mail Error (Contact):', mailError);
    }

    return NextResponse.json({ 
      message: 'Contact message processed',
      note: 'Notification email may not have been sent' 
    }, { status: 200 });
  } catch (error) {
    console.error('Critical API Error:', error);
    return NextResponse.json({ error: 'Failed to process request', details: error.message }, { status: 500 });
  }
}
