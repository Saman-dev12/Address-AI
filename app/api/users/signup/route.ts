import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { companyTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { companyName, email, password } = await request.json();
    console.log("Request Recieved");

    const existingUser = await db
      .select()
      .from(companyTable)
      .where(eq(companyTable.email, email))
      .limit(1);

    console.log(existingUser);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const [user] = await db
      .insert(companyTable)
      .values({
        name: companyName,
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
      })
      .returning();

    console.log(user);

    return NextResponse.json(
      { message: "User created  successfully. Please Login." },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP[POST]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
