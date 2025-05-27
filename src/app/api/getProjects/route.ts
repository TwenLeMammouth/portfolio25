// src/app/api/getProjects/route.ts
import { client } from '@/app/utils/sanity';  // Le client Sanity
import { NextResponse } from 'next/server';

const query = `*[_type == "project"] {
  _id,
  title,
  description,
  technologies[] {
    _id,
    name,
    image
  }
}`;

export async function GET() {
  try {
    const data = await client.fetch(query);
    return NextResponse.json({ projects: data });
  } catch (error) {
    return NextResponse.error();
  }
}
