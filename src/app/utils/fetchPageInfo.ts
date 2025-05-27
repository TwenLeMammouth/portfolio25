import { PageInfo } from "@/app/types/typings";

export const fetchPageInfo = async () => {
  const query = `*[_type == "pageInfo"] { 
    ...,
    "profilePicUrl": profilePic.asset->url,
    "heroImageUrl": heroImage.asset->url,
    "cvfrUrl": cvfr.asset->url,
    "cvenUrl": cven.asset->url,
  }`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch page info');
  }

  const data = await res.json();
  const pageInfo: PageInfo = data.result[0];  // Sanity's response contains a 'result' field

  return pageInfo;
};