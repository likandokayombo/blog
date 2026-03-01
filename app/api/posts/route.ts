import { NextResponse } from "next/server";

import { getAllPostsWithContent } from "@lib/mdx";

export async function GET() {
  const posts = getAllPostsWithContent();
  return NextResponse.json(posts);
}
