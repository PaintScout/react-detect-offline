import { useEffect } from 'react'
import { useConnection } from './useConnection'

export interface OnlineProps {
  children: JSX.Element
  onChange?: (online: boolean) => any
}

export default function Online({ children, onChange }: OnlineProps): JSX.Element {
  const { online } = useConnection()

  useEffect(() => {
    if (onChange) {
      onChange(online)
    }
  }, [online])

  return online ? children : null
}
