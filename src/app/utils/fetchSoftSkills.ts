import { SoftSkill } from '@/app/types/typings';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSoftSkills = async (): Promise<SoftSkill[]> => {
  const query = '*[_type == "softSkill"] | order(level desc)';

  const res = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch soft skills');

  const data = await res.json();
  return data.result;
};