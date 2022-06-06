import { Doc } from '.contentlayer'
import { DocMeta } from '@/contentlayer/types/doc'

export type TreeNodeType = {
  title: string
  route: string
  children: TreeNodeType[]
}

export function generateDocsTree(
  docs: Doc[],
  parentSlugs: string[] = []
): TreeNodeType[] {
  const level = parentSlugs.length

  return (
    docs
      // leveled docs
      .filter(
        (d) =>
          d.meta.length === level + 1 &&
          d.meta
            .map((m: DocMeta) => m.slug)
            .join('/')
            .startsWith(parentSlugs.join('/'))
      )
      // sort by order
      .sort((a, b) => a.meta[level].order - b.meta[level].order)
      // generate tree
      .map<TreeNodeType>((doc) => ({
        title: doc.title,
        route: '/docs/' + doc.meta.map((m: DocMeta) => m.slug).join('/'),
        children: generateDocsTree(
          docs,
          doc.meta.map((m: DocMeta) => m.slug)
        ),
      }))
  )
}
