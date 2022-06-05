import * as React from 'react'
import cn from 'classnames'
import Link from 'next/link'

export const Logo: React.FC = () => (
  <Link href="/">
    <a className={cn('leading-normal text-[32px]  font-["Cano"] font-bold')}>
      <span className={cn('relative')}>
        chioio
        <span
          className={cn(
            'absolute top-[16.5px] right-[30.5px] w-[5.5px] h-[5.5px] rounded-full',
            'bg-main-500'
          )}
        />
      </span>
    </a>
  </Link>
)
