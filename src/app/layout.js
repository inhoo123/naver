import Nav from "@/comps/Nav";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header>
          <h1>NaverApi프로젝트</h1>
          <Nav />
        </header>
        {children}
      </body>
    </html>
  );
}
