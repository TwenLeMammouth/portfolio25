import { Achievement } from '@/app/types/typings';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAchievements = async (): Promise<Achievement[]> => {
  const query = `*[_type == "achievement"] {
    ...,
    "illustrationUrl": image.asset->url,
  }`;

  const res = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch achievements');

  const data = await res.json();
  return data.result;
};