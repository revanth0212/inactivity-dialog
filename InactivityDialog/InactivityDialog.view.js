'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _renderIf = require('render-if');

var _renderIf2 = _interopRequireDefault(_renderIf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderIfValueGreaterThanZero = function renderIfValueGreaterThanZero(value) {
  return (0, _renderIf2.default)(value > 0);
};

var renderIfValueIsZero = function renderIfValueIsZero(value) {
  return (0, _renderIf2.default)(!value);
};

var circularProgressBar = function circularProgressBar(min, max, value, color) {
  return _react2.default.createElement(_CircularProgress2.default, {
    size: 1.5,
    min: min,
    max: max,
    style: { top: '-52px', margin: '0px', left: '3px' },
    mode: 'determinate',
    value: value,
    color: color
  });
};

var UserQuestion = function UserQuestion(_ref) {
  var userQuestion = _ref.userQuestion,
      color = _ref.color,
      style = _ref.style;
  return _react2.default.createElement(
    'p',
    { style: _extends({ fontSize: '25px', paddingLeft: '15px', position: 'absolute' }, style, { color: color }) },
    userQuestion
  );
};

UserQuestion.propTypes = {
  userQuestion: _propTypes.string,
  color: _propTypes.string,
  style: _propTypes.object
};

var UnlockSuccessfulMessage = function UnlockSuccessfulMessage(_ref2) {
  var successfulMessage = _ref2.successfulMessage,
      color = _ref2.color,
      style = _ref2.style;
  return _react2.default.createElement(
    'p',
    { style: _extends({ fontSize: '25px', paddingLeft: '15px', position: 'absolute' }, style, { color: color }) },
    successfulMessage
  );
};

UnlockSuccessfulMessage.propTypes = {
  successfulMessage: _propTypes.string,
  color: _propTypes.string,
  style: _propTypes.object
};

var TimeoutIndicatorPropTypes = {
  min: _propTypes.number,
  max: _propTypes.number,
  value: _propTypes.number,
  icon: _propTypes.node,
  color: _propTypes.string
};

var TimeoutIndicator = function TimeoutIndicator(_ref3) {
  var icon = _ref3.icon,
      _ref3$min = _ref3.min,
      min = _ref3$min === undefined ? 0 : _ref3$min,
      _ref3$max = _ref3.max,
      max = _ref3$max === undefined ? 100 : _ref3$max,
      _ref3$value = _ref3.value,
      value = _ref3$value === undefined ? 100 : _ref3$value,
      color = _ref3.color;
  return _react2.default.createElement(
    'div',
    { style: { position: 'relative', top: '110px', height: '50px' } },
    _react2.default.createElement(
      'div',
      { style: {
          position: 'relative', height: '50px', width: '50px', margin: 'auto'
        }
      },
      _react2.default.createElement(
        _FloatingActionButton2.default,
        { backgroundColor: color },
        icon
      ),
      renderIfValueGreaterThanZero(value)(circularProgressBar(min, max, value, color))
    )
  );
};

TimeoutIndicator.propTypes = TimeoutIndicatorPropTypes;

var InactivityDialogViewPropTypes = {
  value: _propTypes.number,
  open: _propTypes.bool,
  handleCancel: _propTypes.func,
  handleSubmit: _propTypes.func,
  min: _propTypes.number,
  max: _propTypes.number,
  cancelButtonText: _propTypes.string,
  submitButtonText: _propTypes.string,
  userQuestion: _propTypes.string,
  successfulMessage: _propTypes.string,
  SuccessfulIcon: _propTypes.node,
  UserActionWaitingIcon: _propTypes.node,
  buttonLabelStyle: _propTypes.object,
  userActionWaitingColor: _propTypes.string,
  successfulActionColor: _propTypes.string,
  userQuestionStyle: _propTypes.object,
  successfulMessageStyle: _propTypes.object
};

var InactivityDialogView = function InactivityDialogView(_ref4) {
  var _ref4$value = _ref4.value,
      value = _ref4$value === undefined ? 0 : _ref4$value,
      _ref4$open = _ref4.open,
      open = _ref4$open === undefined ? false : _ref4$open,
      handleCancel = _ref4.handleCancel,
      handleSubmit = _ref4.handleSubmit,
      _ref4$min = _ref4.min,
      min = _ref4$min === undefined ? 0 : _ref4$min,
      _ref4$max = _ref4.max,
      max = _ref4$max === undefined ? 100 : _ref4$max,
      cancelButtonText = _ref4.cancelButtonText,
      submitButtonText = _ref4.submitButtonText,
      userQuestion = _ref4.userQuestion,
      successfulMessage = _ref4.successfulMessage,
      SuccessfulIcon = _ref4.SuccessfulIcon,
      UserActionWaitingIcon = _ref4.UserActionWaitingIcon,
      buttonLabelStyle = _ref4.buttonLabelStyle,
      userActionWaitingColor = _ref4.userActionWaitingColor,
      successfulActionColor = _ref4.successfulActionColor,
      userQuestionStyle = _ref4.userQuestionStyle,
      successfulMessageStyle = _ref4.successfulMessageStyle;

  var icon = value ? UserActionWaitingIcon : SuccessfulIcon;
  var actions = [_react2.default.createElement(_FlatButton2.default, { label: cancelButtonText, primary: true, labelStyle: buttonLabelStyle, onClick: handleCancel }), _react2.default.createElement(_FlatButton2.default, {
    label: submitButtonText,
    labelPosition: 'after',
    icon: SuccessfulIcon,
    primary: true,
    keyboardFocused: true,
    labelStyle: buttonLabelStyle,
    onClick: handleSubmit
  })];
  return _react2.default.createElement(
    _Dialog2.default,
    {
      open: open,
      actions: value ? actions : []
    },
    _react2.default.createElement(
      'div',
      { style: { height: '200px' } },
      renderIfValueGreaterThanZero(value)(_react2.default.createElement(UserQuestion, { userQuestion: userQuestion, color: userActionWaitingColor, style: userQuestionStyle })),
      renderIfValueIsZero(value)(_react2.default.createElement(UnlockSuccessfulMessage, { successfulMessage: successfulMessage, color: successfulActionColor, style: successfulMessageStyle })),
      _react2.default.createElement(TimeoutIndicator, { icon: icon, value: value, min: min, max: max, color: value !== 0 ? userActionWaitingColor : successfulActionColor })
    )
  );
};

InactivityDialogView.propTypes = InactivityDialogViewPropTypes;

exports.default = InactivityDialogView;