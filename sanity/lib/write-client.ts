import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token} from '../env'

import imageUrlBuilder from '@sanity/image-url'
export const writeclient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,});

if (!token) {
  throw new Error('Missing Sanity write token. Please set the SANITY_WRITE_TOKEN environment variable.')
}

