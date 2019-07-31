import { useEffect, useState } from 'react'

const inBrowser = typeof navigator !== 'undefined'

// these browsers don't fully support navigator.onLine, so we need to use a polling backup
const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/

export interface PollingConfig {
  enabled?: boolean
  url?: string
  interval?: number
  timeout?: number
}

export interface UseConnectionArgs {
  polling?: PollingConfig | boolean
}

export default function useConnection({ polling }: UseConnectionArgs = {}) {
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
    const { enabled, interval, url, timeout } = getPollingConfig(polling)
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
  }, [polling])

  return {
    online,
    offline: !online
  }
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

    xhr.open('HEAD', url)
    xhr.timeout = timeout
    xhr.send()
  })
}

const getPollingConfig = (polling: PollingConfig | boolean): PollingConfig => {
  const defaultPollingConfig = {
    enabled: inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent),
    url: 'https://ipv4.icanhazip.com/',
    timeout: 5000,
    interval: 5000
  }

  switch (polling) {
    case true:
      return defaultPollingConfig
    case false:
      return { enabled: false }
    default:
      return Object.assign({}, defaultPollingConfig, polling)
  }
}
