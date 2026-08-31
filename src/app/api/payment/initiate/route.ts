import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const { registrationId } = await request.json();

    const sessionCookie = request.cookies.get('hackspark26-session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await adminAuth.verifySessionCookie(sessionCookie, true);

    // Get fee from event settings
    const settingsDoc = await adminDb.collection('eventSettings').doc('main').get();
    const fee = settingsDoc.data()?.registrationFee || 500;
    const currency = settingsDoc.data()?.currency || 'INR';

    // Create Razorpay order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    const order = await razorpay.orders.create({
      amount: fee * 100, // paise
      currency,
      receipt: registrationId,
      notes: {
        registrationId,
        event: "HackSpark '26",
      },
    });

    // Store order reference
    await adminDb.collection('payments').add({
      registrationId,
      razorpayOrderId: order.id,
      amount: fee,
      currency,
      paymentStatus: 'PROCESSING',
      syncStatus: 'PENDING',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      status: 'active',
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Payment initiate error:', error);
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
  }
}
