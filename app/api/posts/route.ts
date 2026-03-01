import { getAllPostsWithContent } from "@lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPostsWithContent();
  return NextResponse.json(posts);
}
