"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

const BookWritePage = () => {
  const { isbn } = useParams("isbn");
  const [bookData, setBookData] = useState([]);
  if (isbn) {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`/api/write/isbn?${isbn}`, {
          method: "POST",
        });
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.log(error);
      }
    };
  }
  return <h1>BookWritePage</h1>;
};
export default BookWritePage;
