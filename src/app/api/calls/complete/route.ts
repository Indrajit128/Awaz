import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, durationSeconds } = await req.json();

    if (!userId || durationSeconds === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const durationMinutes = Math.ceil(durationSeconds / 60);
    const cost = durationMinutes * 10;

    if (cost <= 0) {
      return NextResponse.json({ success: true, message: "No cost for zero duration" });
    }

    // Use our persistent proxy to deduct the balance
    const user: any = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newBalance = Math.max(0, (user.walletBalance || 0) - cost);
    
    // Persistent update to db.json
    await prisma.user.update({
      where: { id: userId },
      data: { walletBalance: newBalance },
    });

    // Create a transaction record (DEBIT)
    await prisma.transaction.create({
      data: {
        userId,
        amount: -cost,
        type: "DEBIT",
        source: "CALL_SYSTEM",
        metadata: JSON.stringify({ durationSeconds, cost }),
      },
    });

    return NextResponse.json({ success: true, newBalance, cost });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
