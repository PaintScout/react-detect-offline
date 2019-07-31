import { useEffect } from 'react'
import useConnection, { UseConnectionArgs } from './useConnection'

export interface DetectorProps extends UseConnectionArgs {
  children: (online: boolean) => JSX.Element
  onChange?: (online: boolean) => any
}

export default function Detector({ children, polling, onChange }: DetectorProps) {
  const { online } = useConnection({ polling })

  useEffect(() => {
    if (onChange) {
      onChange(online)
    }
  }, [online])

  if (children) {
    return children(online)
  }

  return null
}
