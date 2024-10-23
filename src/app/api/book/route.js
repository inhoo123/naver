import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function createBookPost(request) {
    try {
        const {title,discount,description,author} = await request.json();
        const bookPost = await prisma.tbl_books.create({
            data:{
                title:
                author:
                price:
                
            }
        })
    } catch (error) {
        
    }
    
}