'use client'

import {motion} from 'framer-motion'
import {FC, ReactNode} from 'react'

interface ContainerProps {
  className?: string
  children?: ReactNode
  [key: string]: unknown
}

const Container: FC<ContainerProps> = ({className, children, ...rest}) => {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y: 100}}
      viewport={{once: true}}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          ease: [0.07, 0.89, 0.58, 0.97],
          delay: 0.1,
          duration: 0.5,
          type: 'tween',
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default Container
