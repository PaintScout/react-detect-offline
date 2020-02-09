import React from 'react'
export interface PollingConfig {
  enabled?: boolean
  url?: string
  interval?: number
  timeout?: number
}
export interface ConnectionProviderProps {
  poll?: boolean
  config?: PollingConfig
  children: React.ReactNode
}
declare const ConnectionProvider: React.FC<ConnectionProviderProps>
export default ConnectionProvider
