import { defineField, defineType } from 'sanity'
import { UserIcon } from 'lucide-react'

export const startup = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }], 
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number', 
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string', 
      validation: (Rule) =>
        Rule.min(1).max(20).required().warning('Please enter a category'),
    }),
    defineField({
      name: 'description',
      title: 'Description', 
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image', 
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pitch',
      title: 'Pitch',
      type: 'markdown', 
    }),
  ],
})
