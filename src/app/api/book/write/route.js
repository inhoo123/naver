import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isbn = searchParams.get("isbn");
    const book = await prisma.tbl_books.findMany({
      where: {
        isbn: isbn,
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { message: "책목록이 존재하지 않습니다." },
      { status: 404 }
    );
  }
}
