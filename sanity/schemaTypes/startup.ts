import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "slug",
      type: "slug",
        options: {
            source: "title",
            maxLength: 96,
        },
    }),
    defineField({
      name: "author",
      title: "reference",
      type: "reference",
      to:{type:"author"},
    }),
    defineField({
      name: "views",
      title: "Views",
      type: "numbers",
    }),
    defineField({
      name: "category",
      title: "category",
      type: "text",
      validation:(Rule)=>Rule.min(1).max(20).required().warning("please enter a category"),
    }),
    defineField({
      name: "discription",
      title: "Discription",
      type: "text",
    }),
     defineField({
      name: "image",
      title: "Imaage",
      type:"url",
      validation:(Rule)=>Rule.required(),
      
    }), defineField({
      name: "pitch",
      title: "Pitch",
      type:"markdown",
    })
  ],
  
});
