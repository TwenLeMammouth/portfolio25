import { Experience } from "@/app/types/typings";

export const fetchExperiences = async () => {
  const query = `*[_type == "experience"] { 
    ..., 
    "companyImageUrl": companyImage.asset->url, 
    location->,
    technologies[]->{
      ..., 
      "imageUrl": image.asset->url
      }
  } | order(dateStarted)`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch experiences');
  }

  const data = await res.json();
  const experiences: Experience[] = data.result;

  return experiences;
};
