import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { chatId } = await params;

  await db.query(
    'DELETE FROM "Chat" WHERE id = $1 AND "userId" = $2',
    [chatId, session.user.id]
  );

  return NextResponse.json({ message: "Chat deleted" });
}
