import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const books = await prisma.tbl_books.findMany({});
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { message: "책목록이 존재하지 않습니다." },
      { status: 404 }
    );
  }
}
