import { Lesson } from '@/app/types/typings';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchLessons = async (): Promise<Lesson[]> => {
  const query = '*[_type == "lesson"]';

  const res = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch lessons');

  const data = await res.json();
  return data.result;
};