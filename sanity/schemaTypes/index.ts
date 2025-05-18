import { type SchemaTypeDefinition } from 'sanity'
import { author } from '@/sanity/schemaTypes/author'
import { start } from 'repl'
import { startup } from '@/sanity/schemaTypes/startup'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author,startup],
}
