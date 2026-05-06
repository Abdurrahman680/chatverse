import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await db.query('SELECT * FROM "User" WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await db.query(
      'INSERT INTO "User" (id, email, password, name) VALUES ($1, $2, $3, $4)',
      [id, email, hashedPassword, name]
    );

    return NextResponse.json({ message: "User created", userId: id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
