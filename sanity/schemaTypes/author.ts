import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "id",
      title: "Id",
      type: "number",
    }),
    defineField({
      name: "username",
      title: "User-name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "bio",
      title: "BIO",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
