import { useEffect } from 'react'
import { useConnection } from './useConnection'

export interface OfflineProps {
  children: JSX.Element
  onChange?: (online: boolean) => any
}

export default function Offline({ children, onChange }: OfflineProps): JSX.Element {
  const { online } = useConnection()

  useEffect(() => {
    if (onChange) {
      onChange(online)
    }
  }, [online])

  return !online ? children : null
}
