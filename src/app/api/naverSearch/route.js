import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
  const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;
  const apiUrl = `https://openapi.naver.com/v1/search/${type}?query=${encodeURIComponent(
    query
  )}`;

  const naverFetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "plain/text",
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  };
  try {
    const response = await fetch(apiUrl, naverFetchOption);
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
