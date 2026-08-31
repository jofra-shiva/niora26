import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { registrationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = await request.json();

    // Get session cookie
    const sessionCookie = request.cookies.get('hackspark26-session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    // Verify Razorpay signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ success: false, error: 'Payment verification failed' }, { status: 400 });
    }

    // Update payment status in Firestore (server-side only)
    const paymentRef = adminDb.collection('payments').doc();
    await paymentRef.set({
      paymentId: paymentRef.id,
      registrationId,
      userUid: decodedClaims.uid,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      paymentStatus: 'PAID',
      syncStatus: 'PENDING',
      verifiedBy: 'server',
      verifiedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      createdBy: decodedClaims.uid,
      status: 'active',
    });

    // Update registration status
    const regQuery = await adminDb
      .collection('registrations')
      .where('registrationId', '==', registrationId)
      .limit(1)
      .get();

    if (!regQuery.empty) {
      await regQuery.docs[0].ref.update({
        paymentStatus: 'PAID',
        registrationStatus: 'COMPLETE',
        syncStatus: 'PENDING',
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    // Log activity
    await adminDb.collection('activityLogs').add({
      userId: decodedClaims.uid,
      registrationId,
      activityType: 'PAYMENT_SUCCESS',
      description: 'Payment verified and confirmed',
      syncStatus: 'PENDING',
      status: 'SUCCESS',
      timestamp: FieldValue.serverTimestamp(),
      metadata: { razorpayPaymentId, razorpayOrderId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verify error:', error);
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}
