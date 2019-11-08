import { useEffect } from 'react'
import { useConnection } from './useConnection'

export interface DetectorProps {
  children: (online: boolean) => JSX.Element
  onChange?: (online: boolean) => any
}

export default function Detector({ children, onChange }: DetectorProps) {
  const { online } = useConnection()

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
