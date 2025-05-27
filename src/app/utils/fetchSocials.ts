import { Social } from "@/app/types/typings";

export const fetchSocials = async () => {
  const query = `*[_type == "social"]`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch socials');
  }

  const data = await res.json();
  const socials: Social[] = data.result;

  return socials;
};
