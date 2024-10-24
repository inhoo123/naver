"use client";
import Link from "next/link";
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/pages/search">검색</Link>
        </li>
        <li>
          <Link href="/pages/book">책목록</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
