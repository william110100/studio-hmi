'use client'

import {motion} from 'framer-motion'
import {FC, MouseEventHandler, ReactNode} from 'react'

interface ButtonProps {
  className?: string
  children?: ReactNode
  hoverScale?: number
  onClick?: MouseEventHandler<HTMLButtonElement>
  tapScale?: number
  [key: string]: unknown
}

const Button: FC<ButtonProps> = ({className, children, hoverScale, onClick, tapScale, ...rest}) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      transition={{type: 'spring', stiffness: 400, damping: 17}}
      whileHover={{scale: hoverScale}}
      whileTap={{scale: tapScale}}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export default Button
