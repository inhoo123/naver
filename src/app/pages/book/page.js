"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RoomListPage = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // useRouter를 함수로 호출

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch("/api/book/list");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setErrorMessage("책 목록을 가져오는 중 오류 발생");
      }
    };
    fetchBook();
  }, []);

  const handleBookClick = async (isbn) => {
    try {
      const response = await fetch(`/api/book/write?isbn=${isbn}`, {
        method: "POST", // POST 요청으로 변경
      });
      if (response.ok) {
        router.push(`/pages/write/${isbn}`);
      }
      console.log(response);
    } catch (error) {
      setErrorMessage("오류가 발생했습니다.");
    }
  };
  return (
    <div>
      <h1>bookList</h1>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            제목:{book.title},저자:{book.author}
            <button onClick={() => handleBookClick(book.isbn)}>상세</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomListPage;
