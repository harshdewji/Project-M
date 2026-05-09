import { NextResponse } from 'next/server';
import { sendInquiryEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();

    // Save to Neon DB via Prisma
    try {
      await prisma.consultation.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          service: body.service,
          budget: body.budget,
          message: body.message,
        }
      });
    } catch (dbError) {
      console.error('Database Error (Consultation):', dbError);
    }

    // Send Email
    try {
      await sendInquiryEmail(body, 'Consultation');
    } catch (mailError) {
      console.error('Mail Error (Consultation):', mailError);
    }

    return NextResponse.json({ 
      message: 'Consultation request processed',
      note: 'Notification email may not have been sent'
    }, { status: 200 });
  } catch (error) {
    console.error('Critical API Error:', error);
    return NextResponse.json({ error: 'Failed to process request', details: error.message }, { status: 500 });
  }
}
