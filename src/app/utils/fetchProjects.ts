import { Project } from "@/app/types/typings";

export const fetchProjects = async () => {
  const query = `*[_type == "project"] { 
    ..., 
    technologies[]->{
      ..., 
      "imageUrl": image.asset->url
      },
    "imageUrl": image.asset->url
  } | order(order asc)`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await res.json();
  const projects: Project[] = data.result;

  return projects;
};
