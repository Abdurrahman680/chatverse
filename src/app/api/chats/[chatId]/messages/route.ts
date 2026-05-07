import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { generateAIResponse } from "@/lib/gemini";

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const result = await db.query(
    'SELECT * FROM "Message" WHERE "chatId" = $1 ORDER BY "createdAt" ASC',
    [params.chatId]
  );

  return NextResponse.json(result.rows);
}

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();
  const { chatId } = params;

  // Save user message
  const userMsgId = uuidv4();
  await db.query(
    'INSERT INTO "Message" (id, content, role, "chatId") VALUES ($1, $2, $3, $4)',
    [userMsgId, content, "user", chatId]
  );

  // Get conversation history for context
  const historyResult = await db.query(
    'SELECT content, role FROM "Message" WHERE "chatId" = $1 ORDER BY "createdAt" ASC LIMIT 10',
    [chatId]
  );
  const history = historyResult.rows;

  try {
    const messages = history.map((m: { role: string, content: string }) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content
    }));

    const aiResponse = await generateAIResponse(messages);

    // Save AI response
    const aiMsgId = uuidv4();
    const aiMsgResult = await db.query(
      'INSERT INTO "Message" (id, content, role, "chatId") VALUES ($1, $2, $3, $4) RETURNING *',
      [aiMsgId, aiResponse, "assistant", chatId]
    );

    // Update chat timestamp
    await db.query(
      'UPDATE "Chat" SET "updatedAt" = NOW() WHERE id = $1',
      [chatId]
    );

    return NextResponse.json(aiMsgResult.rows[0]);
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
