"use client";

import { useState } from "react";
import Link from "next/link";
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [type, setType] = useState("blog");
  const naverSearch = async (query, searchType) => {
    try {
      const response = await fetch(
        `/api/naverSearch?query=${encodeURIComponent(query)}&type=${searchType}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        const searchResults = await naverSearch(searchTerm, type);
        if (searchResults && searchResults.items) {
          setResults(searchResults.items);
        } else {
          setResults([]); // 결과가 없으면 빈 배열로 설정
        }
      } catch (error) {
        console.error("검색 실패:", error);
      }
    }
  };
  // 책 정보 저장 버튼을 눌렀을 때 실행
  const saveBook = async (book) => {
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      const data = await response.json();
      console.log("책 저장 성공!:", data);
    } catch (error) {
      console.log("책 저장 실패", error);
    }
  };
  return (
    <>
      <header>
        <h1>NAVER OPEN API</h1>
      </header>
      <div>
        <p>검색하기</p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)} // 선택된 타입을 업데이트
          >
            <option value="blog">블로그</option>
            <option value="news">뉴스</option>
            <option value="book">책</option>
          </select>
          <button type="submit">Search</button>
        </form>
        <ul>
          {results.length > 0 ? (
            results.map((result) => (
              <li key={result.link}>
                {type === "blog" && (
                  <>
                    <p>
                      제목:
                      <a href={result.link}>{result.title}</a>
                    </p>
                    <p>작성자: {result.bloggername}</p>
                    <p>설명: {result.description}</p>
                    <p>작성일: {result.postdate}</p>
                  </>
                )}
                {type === "news" && (
                  <>
                    <p>
                      제목:
                      <a href={result.link}>{result.title}</a>
                    </p>
                    <p>설명: {result.description}</p>
                    <p>작성일: {result.pubDate}</p>
                  </>
                )}
                {type === "book" && (
                  <>
                    <img src={result.image}></img>
                    <p>
                      제목:
                      <Link href={result.link}>{result.title}</Link>
                    </p>
                    <p>저자: {result.author}</p>
                    <p>출판사: {result.publisher}</p>
                    <p>설명: {result.description}</p>
                    <p>출판일: {result.pubdate}</p>
                    <p>가격: {result.discount}</p>
                    <p>식별코드:{result.isbn}</p>
                    <button onClick={() => saveBook(result)}>저장</button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </ul>
      </div>
    </>
  );
};
export default HomePage;
