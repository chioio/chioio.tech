import { makeSource } from 'contentlayer/source-files'

import highlight from 'rehype-highlight'

import { CONTENT_DIR } from './src/configs/constants'
import DocType from './src/contentlayer/types/doc'
import PostType from './src/contentlayer/types/post'

export default makeSource({
  contentDirPath: CONTENT_DIR,
  documentTypes: [DocType, PostType],
  mdx: { rehypePlugins: [highlight] },
})
