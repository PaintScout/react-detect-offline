import { ConnectionContext } from './ConnectionContext'
import { useContext } from 'react'

export function useConnection() {
  return useContext(ConnectionContext)
}
