import React from 'react'

/////////////////// Context ///////////////////////////
export interface ConnectionContextValue {
  online?: boolean
}

export const ConnectionContext = React.createContext<ConnectionContextValue>({ online: true })
