"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useDetector;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var inBrowser = typeof navigator !== "undefined"; // these browsers don't fully support navigator.onLine, so we need to use a polling backup

var unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;

var ping = function ping(_ref) {
  var url = _ref.url,
      timeout = _ref.timeout;
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

    xhr.open("HEAD", url);
    xhr.timeout = timeout;
    xhr.send();
  });
};

var getPollingConfig = function getPollingConfig(polling) {
  var defaultPollingConfig = {
    enabled: inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent),
    url: "https://ipv4.icanhazip.com/",
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

function useDetector() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      polling = _ref2.polling;

  var _useState = (0, _react.useState)(inBrowser && typeof navigator.onLine === "boolean" ? navigator.onLine : true),
      _useState2 = _slicedToArray(_useState, 2),
      online = _useState2[0],
      setOnline = _useState2[1];

  (0, _react.useEffect)(function () {
    var goOnline = function goOnline() {
      setOnline(true);
    };

    var goOffline = function goOffline() {
      setOnline(false);
    };

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return function () {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  (0, _react.useEffect)(function () {
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

module.exports = exports.default;