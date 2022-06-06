import * as React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { FaChevronRight } from 'react-icons/fa'
import { TreeNodeType } from '@/utils/build-docs-tree'

interface DocNavigationProps {
  tree: TreeNodeType[]
}

export const DocNavigation: React.FC<DocNavigationProps> = ({ tree }) => {
  const { asPath } = useRouter()

  return (
    <nav className={cn('relative grow overflow-y-auto scrollbar')}>
      <Link href={'/docs'}>
        <a>
          <span
            className={cn(
              'flex items-center justify-between mb-2 px-4 py-1 rounded-md text-lg font-medium',
              asPath === '/docs'
                ? 'text-main-500 dark:text-main-500 bg-main-500/10 dark:bg-main-500/10'
                : 'hover:bg-gray-200/40 hover:dark:bg-gray-800/40'
            )}>
            NOTES
          </span>
        </a>
      </Link>
      <Tree tree={tree} level={0} activeRoute={asPath} />
    </nav>
  )
}

interface TreeProps {
  tree: TreeNodeType[]
  level: number
  activeRoute: string
}

export const Tree: React.FC<TreeProps> = ({ tree, level, activeRoute }) => {
  return (
    <ul
      className={cn(
        'relative space-y-2',
        level > 0 ? 'ml-4 text-base' : 'text-lg'
      )}>
      {tree.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          level={level}
          activeRoute={activeRoute}
        />
      ))}
    </ul>
  )
}

interface TreeNodeProps {
  node: TreeNodeType
  level: number
  activeRoute: string
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, activeRoute }) => {
  // When page loaded, check the expand navigation.
  const isNodeUncollapsed =
    // level 1
    activeRoute === node.route ||
    // level 2
    activeRoute.split('/').slice(0, 3).join('/') === node.route ||
    // level 3
    activeRoute.split('/').slice(0, 4).join('/') === node.route

  // const [uncollapsed, setUncollapsed] = Motion.useCycle(isUncollapsed, false)
  const [uncollapsed, setUncollapsed] = React.useState(isNodeUncollapsed)

  // When click the level 2 cate, keep the level 1 expanded.
  const cateRouteEqualed =
    activeRoute.split('/').slice(0, 3).join('/') ===
    node.route.split('/').slice(0, 3).join('/')

  const container = {
    visible: {
      height: 'fit-content',
      opacity: 1,
      transition: { duration: 0.3 },
    },
    hidden: {
      height: 0,
      opacity: 0,
    },
  }

  return (
    <li className={cn('relative')}>
      <TreeNodeLink
        title={node.title}
        route={node.route}
        level={level}
        activeRoute={activeRoute}
        collapsible={node.children.length > 0}
        // Make the level 2 uncollapsed change by click, and level 1 uncollapsed by path change.
        uncollapsed={cateRouteEqualed && uncollapsed}
        onClick={() => setUncollapsed(level === 0 || !uncollapsed)}
      />
      {node.children.length > 0 && cateRouteEqualed && (
        <motion.div
          variants={container}
          initial="hidden"
          animate={uncollapsed ? 'visible' : 'hidden'}
          className={cn('mt-2')}>
          <Tree
            tree={node.children}
            level={level + 1}
            activeRoute={activeRoute}
          />
        </motion.div>
      )}
    </li>
  )
}

interface TreeNodeLinkProps {
  title: string
  route: string
  level: number
  activeRoute: string
  collapsible: boolean
  uncollapsed: boolean
  onClick: () => void
}

const TreeNodeLink: React.FC<TreeNodeLinkProps> = ({
  title,
  route,
  level,
  activeRoute,
  collapsible,
  uncollapsed,
  onClick,
}) => {
  return (
    <Link href={route}>
      <a onClick={onClick}>
        <span
          className={cn(
            'flex items-center justify-between px-4 py-1 rounded-md',
            route === activeRoute
              ? 'text-main-500 dark:text-main-500 bg-main-500/10 dark:bg-main-500/10'
              : 'hover:bg-gray-200/40 hover:dark:bg-gray-800/40',
            !collapsible && level > 0 ? 'font-light' : 'py-1'
          )}>
          {title}
          {collapsible && (
            <FaChevronRight
              className={cn(
                'shrink-0 text-sm transition-transform duration-300',
                route === activeRoute
                  ? 'text-main-500 dark:text-main-500'
                  : 'text-gray-300 dark:text-gray-500',
                uncollapsed && 'rotate-90'
              )}
            />
          )}
        </span>
      </a>
    </Link>
  )
}