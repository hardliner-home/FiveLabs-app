import { ReactElement } from 'react'
import { PresenceTransition } from 'native-base'

interface Props {
  children: ReactElement,
  delay?: number,
  duration?: number,
  width?: string,
  style?: any
}

export default function Faded({ children, delay = 0, duration = 500, ...props }: Props) {

  return (
    <PresenceTransition
      {...props}
      visible
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay,
          duration
        }
      }}
    >
      {children}
    </PresenceTransition>
  )
}
