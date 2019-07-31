"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Detector;

var _react = require("react");

var _useConnection2 = _interopRequireDefault(require("./useConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Detector(_ref) {
  var children = _ref.children,
      polling = _ref.polling,
      render = _ref.render,
      onChange = _ref.onChange;

  var _useConnection = (0, _useConnection2["default"])(polling),
      online = _useConnection.online;

  (0, _react.useEffect)(function () {
    if (onChange) {
      onChange({
        online: online
      });
    }
  }, [online]);

  if (render) {
    render({
      online: online
    });
  }

  if (children) {
    return children({
      online: online
    });
  }

  return null;
}