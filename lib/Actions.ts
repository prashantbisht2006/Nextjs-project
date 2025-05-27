"use server";
import { auth } from "@/auth";
import { parseresponse } from "./utils";
import slugify from "slugify";
import { writeclient } from "@/sanity/lib/write-client";
import {useSession} from "next-auth/react";
import { client } from "@/sanity/lib/client";



export const createPitch = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();

  if (!session) {
    return parseresponse({ error: "Sign in first", status: "ERROR" });
  }

  // Extract form fields except 'pitch'
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form.entries()).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // 1. Query Sanity author by email
    const authorQuery = `*[_type == "author" && email == $email][0] { _id, name, email, image, username }`;
    let author = await client.fetch(authorQuery, { email: session.user.email });

    // 2. If author doesn't exist, create it
    if (!author) {
      const newAuthor = {
        _type: "author",
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        // add any other fields you need here, e.g. username
      };
      author = await writeclient.create(newAuthor);
    }

    // 3. Now create startup with author._id as reference
    const startup = {
      _type: "startup",
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: author._id,  // Use the Sanity author ID here
      },
      pitch,
    };

    const result = await writeclient.create(startup);

    return parseresponse({ ...result, status: "SUCCESS" });

  } catch (error) {
    console.error("Create Pitch Error:", error);
    return parseresponse({ error: JSON.stringify(error), status: "ERROR" });
  }
};