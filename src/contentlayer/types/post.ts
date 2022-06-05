import { defineDocumentType } from 'contentlayer/source-files'

export default defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {},
}))
