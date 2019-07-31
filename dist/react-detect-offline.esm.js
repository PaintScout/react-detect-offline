import { useState, useEffect } from 'react';

var inBrowser = typeof navigator !== 'undefined'; // these browsers don't fully support navigator.onLine, so we need to use a polling backup

var unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;
function useConnection(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      polling = _ref.polling;

  var _useState = useState(inBrowser && typeof navigator.onLine === 'boolean' ? navigator.onLine : true),
      online = _useState[0],
      setOnline = _useState[1];

  useEffect(function () {
    var goOnline = function goOnline() {
      setOnline(true);
    };

    var goOffline = function goOffline() {
      setOnline(false);
    };

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return function () {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);
  useEffect(function () {
    var _getPollingConfig = getPollingConfig(polling),
        enabled = _getPollingConfig.enabled,
        interval = _getPollingConfig.interval,
        url = _getPollingConfig.url,
        timeout = _getPollingConfig.timeout;

    var pollingId = null;

    if (enabled) {
      pollingId = setInterval(function () {
        ping({
          url: url,
          timeout: timeout
        }).then(function (result) {
          setOnline(result);
        });
      }, interval);
    }

    return function () {
      if (pollingId) {
        clearInterval(pollingId);
      }
    };
  }, [polling]);
  return {
    online: online,
    offline: !online
  };
}

var ping = function ping(_ref2) {
  var url = _ref2.url,
      timeout = _ref2.timeout;
  return new Promise(function (resolve) {
    var isOnline = function isOnline() {
      return resolve(true);
    };

    var isOffline = function isOffline() {
      return resolve(false);
    };

    var xhr = new XMLHttpRequest();
    xhr.onerror = isOffline;
    xhr.ontimeout = isOffline;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        if (xhr.status) {
          isOnline();
        } else {
          isOffline();
        }
      }
    };

    xhr.open('HEAD', url);
    xhr.timeout = timeout;
    xhr.send();
  });
};

var getPollingConfig = function getPollingConfig(polling) {
  var defaultPollingConfig = {
    enabled: inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent),
    url: 'https://ipv4.icanhazip.com/',
    timeout: 5000,
    interval: 5000
  };

  switch (polling) {
    case true:
      return defaultPollingConfig;

    case false:
      return {
        enabled: false
      };

    default:
      return Object.assign({}, defaultPollingConfig, polling);
  }
};

function Online(_ref) {
  var children = _ref.children,
      polling = _ref.polling,
      onChange = _ref.onChange;

  var _useConnection = useConnection({
    polling: polling
  }),
      online = _useConnection.online;

  useEffect(function () {
    if (onChange) {
      onChange(online);
    }
  }, [online]);
  return online ? children : null;
}

function Offline(_ref) {
  var children = _ref.children,
      polling = _ref.polling,
      onChange = _ref.onChange;

  var _useConnection = useConnection({
    polling: polling
  }),
      online = _useConnection.online;

  useEffect(function () {
    if (onChange) {
      onChange(online);
    }
  }, [online]);
  return !online ? children : null;
}

function Detector(_ref) {
  var children = _ref.children,
      polling = _ref.polling,
      onChange = _ref.onChange;

  var _useConnection = useConnection({
    polling: polling
  }),
      online = _useConnection.online;

  useEffect(function () {
    if (onChange) {
      onChange(online);
    }
  }, [online]);

  if (children) {
    return children(online);
  }

  return null;
}

export { Detector, Offline, Online, useConnection };
//# sourceMappingURL=react-detect-offline.esm.js.map
