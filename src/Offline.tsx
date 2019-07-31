import { useEffect } from 'react'
import useConnection, { UseConnectionArgs } from './useConnection'

export interface OfflineProps extends UseConnectionArgs {
  children: JSX.Element
  onChange?: (online: boolean) => any
}

export default function Offline({ children, polling, onChange }: OfflineProps): JSX.Element {
  const { online } = useConnection({ polling })

  useEffect(() => {
    if (onChange) {
      onChange(online)
    }
  }, [online])

  return !online ? children : null
}
