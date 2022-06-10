import { Doc } from '.contentlayer'
import { DocMeta } from '@/contentlayer/types/doc'

export type TreeNode = {
  title: string
  route: string
  children: Array<TreeNode>
}

export function generateDocsTree(
  docs: Doc[],
  parentSlugs: string[] = []
): Array<TreeNode> {
  const level = parentSlugs.length

  const tree = docs
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
    .map<TreeNode>((doc) => ({
      title: doc.title,
      route: '/docs/' + doc.meta.map((m: DocMeta) => m.slug).join('/'),
      children: generateDocsTree(
        docs,
        doc.meta.map((m: DocMeta) => m.slug)
      ),
    }))

  if (level === 0) {
    return [
      {
        title: 'NOTES',
        route: '/docs',
        children: [],
      },
      ...tree,
    ]
  }
  return tree
}
