import { NextResponse } from "next/server";

import { getAllPostsWithContent } from "@lib/mdx";

/**
 * API endpoint to get all posts with their content
 * @returns JSON response with all posts
 */
export async function GET() {
  const posts = getAllPostsWithContent();
  return NextResponse.json(posts);
}
