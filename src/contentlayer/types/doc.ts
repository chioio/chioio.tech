import { defineDocumentType } from 'contentlayer/source-files'

export default defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {},
}))
