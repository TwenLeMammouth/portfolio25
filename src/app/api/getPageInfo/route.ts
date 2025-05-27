// src/app/api/getPageInfo/route.ts
import { client } from '@/app/utils/sanity';  // Le client Sanity
import { NextResponse } from 'next/server';

const query = `*[_type == "pageInfo"] {
  _id,
  name,
  role,
  profilePic
}`;

export async function GET() {
  try {
    const data = await client.fetch(query);
    return NextResponse.json({ pageInfo: data[0] });
  } catch (error) {
    return NextResponse.error();
  }
}
