import { createClient } from '@sanity/client';
import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,  
  apiVersion: "2023-03-09",
  useCdn: process.env.NODE_ENV === 'production',
};

export const client = createClient(config);

export const urlFor = (source: SanityImageSource) => {
  // Si la source est définie, on génère l'URL de l'image
  if (source) {
    return createImageUrlBuilder(client).image(source).url();
  }
  return ''; // Retourne une chaîne vide si aucune image n'est définie
};
