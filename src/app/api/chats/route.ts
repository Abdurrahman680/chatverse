import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const result = await db.query(
    'SELECT * FROM "Chat" WHERE "userId" = $1 ORDER BY "updatedAt" DESC',
    [session.user.id]
  );

  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();
  const id = uuidv4();

  const result = await db.query(
    'INSERT INTO "Chat" (id, title, "userId", "updatedAt") VALUES ($1, $2, $3, NOW()) RETURNING *',
    [id, title || "New Chat", session.user.id]
  );

  return NextResponse.json(result.rows[0]);
}
