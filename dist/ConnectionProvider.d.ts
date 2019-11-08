import React from 'react'
export interface ConnectionProviderProps {
  poll?: boolean
  children: React.ReactNode
}
declare const ConnectionProvider: React.FC<ConnectionProviderProps>
export default ConnectionProvider
