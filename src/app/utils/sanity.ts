import { createClient } from '@sanity/client';
import createImageUrlBuilder from "@sanity/image-url";

import { fetchPageInfo } from '@/app/utils/fetchPageInfo'
import { fetchExperiences } from '@/app/utils/fetchExperiences'
import { fetchSkills } from '@/app/utils/fetchSkills'
import { fetchProjects } from '@/app/utils/fetchProjects'
import { fetchSocials } from '@/app/utils/fetchSocials'
import { fetchLocations } from '@/app/utils/fetchLocations'
import { fetchTrips } from '@/app/utils/fetchTrips'

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,  
  apiVersion: "2023-03-09",
  useCdn: process.env.NODE_ENV === 'production',
};

export const client = createClient(config);

export const urlFor = (source: any) => {
  // Si la source est définie, on génère l'URL de l'image
  if (source) {
    return createImageUrlBuilder(client).image(source).url();
  }
  return ''; // Retourne une chaîne vide si aucune image n'est définie
};

// export const urlFor = (source: any) => {
//   if (!source) return ''; // Evite de tenter de créer une URL si la source est undefined.
//   return createImageUrlBuilder(client).image(source).url();
// };

// export async function getStaticProps() {
//   const pageInfo = await fetchPageInfo();
//   const experiences = await fetchExperiences();
//   const skills = await fetchSkills();
//   const projects = await fetchProjects();
//   const socials = await fetchSocials();
//   const locations = await fetchLocations();
//   const trips = await fetchTrips();

//   return {
//     props: {
//       pageInfo,
//       experiences,
//       skills,
//       projects,
//       socials,
//       locations,
//       trips,
//     },
//     revalidate: 86400, // Revalide toutes les 24h
//   };
// }