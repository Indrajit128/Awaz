import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { amount, userId } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use our persistent proxy to update the balance
    const user: any = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newBalance = (user.walletBalance || 0) + amount;
    
    // Persistent update to db.json
    await prisma.user.update({
      where: { id: userId },
      data: { walletBalance: newBalance },
    });

    // Create a transaction record
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type: "CREDIT",
        source: "RAZORPAY",
        metadata: JSON.stringify({ razorpay_payment_id: "pay_simulated_" + Date.now() }),
      },
    });

    return NextResponse.json({ success: true, newBalance });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
