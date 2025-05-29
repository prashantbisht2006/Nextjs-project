"use server";

import { auth } from "@/auth";
import { parseresponse } from "./utils";
import slugify from "slugify";
import { writeclient } from "@/sanity/lib/write-client";
import {useSession} from "next-auth/react";
import { client } from "@/sanity/lib/client";


export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();
  console.log("Session in createPitch:", session);

  if (!session)
    return parseresponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user.id,
      },
      pitch,
    };

    const result = await writeclient.create({ _type: "startup", ...startup });

    return parseresponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseresponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};