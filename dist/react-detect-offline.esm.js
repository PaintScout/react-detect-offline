import React, { useContext, useEffect, useState, useMemo } from 'react'

var ConnectionContext =
  /*#__PURE__*/
  React.createContext({
    online: true
  })

function useConnection() {
  return useContext(ConnectionContext)
}

function Online(_ref) {
  var children = _ref.children,
    onChange = _ref.onChange

  var _useConnection = useConnection(),
    online = _useConnection.online

  useEffect(
    function() {
      if (onChange) {
        onChange(online)
      }
    },
    [online]
  )
  return online ? children : null
}

function Offline(_ref) {
  var children = _ref.children,
    onChange = _ref.onChange

  var _useConnection = useConnection(),
    online = _useConnection.online

  useEffect(
    function() {
      if (onChange) {
        onChange(online)
      }
    },
    [online]
  )
  return !online ? children : null
}

function Detector(_ref) {
  var children = _ref.children,
    onChange = _ref.onChange

  var _useConnection = useConnection(),
    online = _useConnection.online

  useEffect(
    function() {
      if (onChange) {
        onChange(online)
      }
    },
    [online]
  )

  if (children) {
    return children(online)
  }

  return null
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

var inBrowser = typeof navigator !== 'undefined' // these browsers don't fully support navigator.onLine, so we need to use a polling backup

var unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/

var ConnectionProvider = function ConnectionProvider(_ref) {
  var _ref$poll = _ref.poll,
    poll = _ref$poll === void 0 ? true : _ref$poll,
    config = _ref.config,
    children = _ref.children

  var _useState = useState(inBrowser && typeof navigator.onLine === 'boolean' ? navigator.onLine : true),
    online = _useState[0],
    setOnline = _useState[1]

  useEffect(function() {
    var goOnline = function goOnline() {
      setOnline(true)
    }

    var goOffline = function goOffline() {
      setOnline(false)
    }

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return function() {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])
  useEffect(
    function() {
      var _getPollingConfig = getPollingConfig(poll, config),
        enabled = _getPollingConfig.enabled,
        interval = _getPollingConfig.interval,
        url = _getPollingConfig.url,
        timeout = _getPollingConfig.timeout

      var pollingId = null

      if (enabled) {
        pollingId = setInterval(function() {
          ping({
            url: url,
            timeout: timeout
          }).then(function(result) {
            setOnline(result)
          })
        }, interval)
      }

      return function() {
        if (pollingId) {
          clearInterval(pollingId)
        }
      }
    },
    [poll]
  )
  var value = useMemo(
    function() {
      return {
        online: online
      }
    },
    [online]
  )
  return React.createElement(
    ConnectionContext.Provider,
    {
      value: value
    },
    children
  )
}

var ping = function ping(_ref2) {
  var url = _ref2.url,
    timeout = _ref2.timeout
  return new Promise(function(resolve) {
    var isOnline = function isOnline() {
      return resolve(true)
    }

    var isOffline = function isOffline() {
      return resolve(false)
    }

    var xhr = new XMLHttpRequest()
    xhr.onerror = isOffline
    xhr.ontimeout = isOffline

    xhr.onreadystatechange = function() {
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

var getPollingConfig = function getPollingConfig(polling, config) {
  var defaultPollingConfig = {
    enabled: inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent),
    url: 'https://api.paintscout.com/',
    timeout: 5000,
    interval: 5000
  }

  var pollingConfig = _extends({}, defaultPollingConfig, {}, config ? config : {})

  switch (polling) {
    case true:
      return pollingConfig

    case false:
      return {
        enabled: false
      }

    default:
      return Object.assign({}, pollingConfig, polling)
  }
}

export { ConnectionContext, ConnectionProvider, Detector, Offline, Online, useConnection }
//# sourceMappingURL=react-detect-offline.esm.js.map
