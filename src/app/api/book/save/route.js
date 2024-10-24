import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const {
      title,
      link,
      image,
      author,
      discount,
      publisher,
      pubdate,
      isbn,
      description,
    } = await request.json();
    const bookPost = await prisma.tbl_books.create({
      data: {
        isbn: isbn,
        title: title,
        author: author,
        publisher: publisher,
        price: Number(discount),
        discount: Number(discount),
        description: description,
        pubdate: pubdate,
        link: link,
        image: image,
      },
    });
    return NextResponse.json({ suceess: true, book: bookPost });
  } catch (error) {
    console.log("책 저장 실패", error);
    return NextResponse.json({
      suceess: false,
      message: "책 저장 실패",
      error,
    });
  }
}
