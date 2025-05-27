import { Location } from "@/app/types/typings";

export const fetchLocations = async () => {
  const query = `*[_type == "location"]`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch locations');
  }

  const data = await res.json();
  const locations: Location[] = data.result;

  return locations;
};
