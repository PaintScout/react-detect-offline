import { useEffect } from 'react'
import useConnection, { UseConnectionArgs } from './useConnection'

export interface OnlineProps extends UseConnectionArgs {
  children: JSX.Element
  onChange?: (online: boolean) => any
}

export default function Online({ children, polling, onChange }: OnlineProps): JSX.Element {
  const { online } = useConnection({ polling })

  useEffect(() => {
    if (onChange) {
      onChange(online)
    }
  }, [online])

  return online ? children : null
}
