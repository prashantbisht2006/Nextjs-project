import { defineQuery } from "next-sanity";

export const STARTUPS_QUERIES = `*[_type == "startup" && defined(slug.current)] | order(_createdAt desc)[0..5] {
  _id,
  title,
  slug,
  _createdAt,
  author->{_id, name, image, bio},
  views,
  description,
  category,
  image
}`;
;
