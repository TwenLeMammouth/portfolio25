import { Trip } from "@/app/types/typings";

export const fetchTrips = async () => {
  const query = `*[_type == "trip"] { 
    ...,
    from->,
    to->
  }`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch trips');
  }

  const data = await res.json();
  const trips: Trip[] = data.result;

  return trips;
};
