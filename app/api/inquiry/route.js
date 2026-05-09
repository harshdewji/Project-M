import { NextResponse } from 'next/server';
import { sendInquiryEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();

    // Save to Neon DB via Prisma
    try {
      await prisma.inquiry.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          project: body.project,
          timeline: body.timeline,
          message: body.message,
        }
      });
    } catch (dbError) {
      console.error('Database Error (Inquiry):', dbError);
    }

    // Send Email
    try {
      await sendInquiryEmail(body, 'Project Inquiry');
    } catch (mailError) {
      console.error('Mail Error (Inquiry):', mailError);
    }

    return NextResponse.json({ 
      message: 'Project inquiry processed',
      note: 'Notification email may not have been sent'
    }, { status: 200 });
  } catch (error) {
    console.error('Critical API Error:', error);
    return NextResponse.json({ error: 'Failed to process request', details: error.message }, { status: 500 });
  }
}
