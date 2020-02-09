import React, { useState, useEffect, useMemo } from 'react'
import { ConnectionContext } from './ConnectionContext'

const inBrowser = typeof navigator !== 'undefined'

// these browsers don't fully support navigator.onLine, so we need to use a polling backup
const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/

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

const ConnectionProvider: React.FC<ConnectionProviderProps> = ({ poll = true, config, children }) => {
  const [online, setOnline] = useState(inBrowser && typeof navigator.onLine === 'boolean' ? navigator.onLine : true)

  useEffect(() => {
    const goOnline = () => {
      setOnline(true)
    }
    const goOffline = () => {
      setOnline(false)
    }
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  useEffect(() => {
    const { enabled, interval, url, timeout } = getPollingConfig(poll, config)
    let pollingId: NodeJS.Timeout = null

    if (enabled) {
      pollingId = setInterval(() => {
        ping({ url, timeout }).then((result: boolean) => {
          setOnline(result)
        })
      }, interval)
    }

    return () => {
      if (pollingId) {
        clearInterval(pollingId)
      }
    }
  }, [poll])

  const value = useMemo(() => ({ online }), [online])

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>
}

const ping = ({ url, timeout }: { url: string; timeout: number }) => {
  return new Promise(resolve => {
    const isOnline = () => resolve(true)
    const isOffline = () => resolve(false)

    const xhr = new XMLHttpRequest()

    xhr.onerror = isOffline
    xhr.ontimeout = isOffline
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        if (xhr.status) {
          isOnline()
        } else {
          isOffline()
        }
      }
    }

    xhr.open('GET', url)
    xhr.timeout = timeout
    xhr.send()
  })
}

const getPollingConfig = (polling: boolean, config: PollingConfig): PollingConfig => {
  const defaultPollingConfig = {
    enabled: inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent),
    url: 'https://api.paintscout.com/',
    timeout: 5000,
    interval: 5000
  }

  const pollingConfig = {
    ...defaultPollingConfig,
    ...(config ? config : {})
  }

  switch (polling) {
    case true:
      return pollingConfig
    case false:
      return { enabled: false }
    default:
      return Object.assign({}, pollingConfig, polling)
  }
}

export default ConnectionProvider
