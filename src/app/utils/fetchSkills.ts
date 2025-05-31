import { Skill } from "@/app/types/typings";

export const fetchSkills = async () => {
  const query = `*[_type == "skill"] { 
    ...,
    "imageUrl": image.asset->url
  } | order(order asc)`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch skills');
  }

  const data = await res.json();
  const skills: Skill[] = data.result;

  return skills;
};
