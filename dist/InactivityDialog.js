'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _lockOpen = require('material-ui/svg-icons/action/lock-open');

var _lockOpen2 = _interopRequireDefault(_lockOpen);

var _lockOutline = require('material-ui/svg-icons/action/lock-outline');

var _lockOutline2 = _interopRequireDefault(_lockOutline);

var _InactivityDialog = require('./InactivityDialog.view');

var _InactivityDialog2 = _interopRequireDefault(_InactivityDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_TIMEOUT = 3 * 60 * 1000; // 3 minutes of inactivity before the dialog opens up

var DEFAULT_AUTO_OK_TIMEOUT = 60; // User gets 60 seconds before the lot auto unlocks.

var DEFAULT_TIMER_CHANGE_TIMEOUT = 1000; // 1000ms = 1sec. Timer value changes every 1 second.

var DEFAULT_SUCCESSFUL_DIALOG_TIMEOUT = 2000; // Show successful message for 2 seconds.

var InactivityDialog = function (_Component) {
  _inherits(InactivityDialog, _Component);

  function InactivityDialog(props) {
    _classCallCheck(this, InactivityDialog);

    var _this = _possibleConstructorReturn(this, (InactivityDialog.__proto__ || Object.getPrototypeOf(InactivityDialog)).call(this, props));

    _this.restartTimer = function () {
      if (!_this.state.open) {
        _this.timerId && window.clearTimeout(_this.timerId);
        _this.timerId = window.setTimeout(_this.openInactivityDialog, _this.props.timeout);
      }
    };

    _this.openInactivityDialog = function () {
      _this.clearKeyboardAndMouseEventListeners();
      _this.props.beforeInactivityDialogOpen();
      _this.setState({ open: true, timerValue: _this.props.autoUnlockTimeout });
      _this.intervalId = window.setInterval(_this.changeTimerClock, DEFAULT_TIMER_CHANGE_TIMEOUT);
    };

    _this.closeInactivityDialog = function () {
      _this.props.beforeInactivityDialogClose();
      _this.setState({ open: false, timerValue: 0 });
    };

    _this.changeTimerClock = function () {
      var presentValue = _this.state.timerValue;
      if (presentValue > 0) {
        _this.setState({ timerValue: presentValue - 1 });
      } else {
        _this.handleSubmit();
      }
    };

    _this.prepForDialogClose = function () {
      _this.timerId && window.clearTimeout(_this.timerId);
      _this.intervalId && window.clearInterval(_this.intervalId);
      _this.submitTimeoutId && window.clearTimeout(_this.submitTimeoutId);
    };

    _this.handleCancel = function () {
      _this.prepForDialogClose();
      _this.closeInactivityDialog();
      _this.setKeyboardAndMouseEventListeners();
      _this.timerId = window.setTimeout(_this.openInactivityDialog, _this.props.timeout);
      _this.props.handleCancel();
    };

    _this.handleSubmit = function () {
      _this.setState({ open: true, timerValue: 0 });
      _this.submitTimeoutId = window.setTimeout(function () {
        _this.prepForDialogClose();
        _this.closeInactivityDialog();
        _this.clearKeyboardAndMouseEventListeners();
        _this.props.handleSubmit();
      }, DEFAULT_SUCCESSFUL_DIALOG_TIMEOUT);
      _this.intervalId && window.clearInterval(_this.intervalId);
    };

    _this.state = {
      open: false,
      timerValue: props.autoUnlockTimeout || DEFAULT_AUTO_OK_TIMEOUT
    };
    return _this;
  }

  _createClass(InactivityDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.timerId = window.setTimeout(this.openInactivityDialog, this.props.timeout);
      this.setKeyboardAndMouseEventListeners();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.prepForDialogClose();
      this.clearKeyboardAndMouseEventListeners();
    }
  }, {
    key: 'setKeyboardAndMouseEventListeners',
    value: function setKeyboardAndMouseEventListeners() {
      window.addEventListener('keypress', this.restartTimer);
      window.addEventListener('mousemove', this.restartTimer);
    }
  }, {
    key: 'clearKeyboardAndMouseEventListeners',
    value: function clearKeyboardAndMouseEventListeners() {
      window.removeEventListener('keypress', this.restartTimer);
      window.removeEventListener('mousemove', this.restartTimer);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_InactivityDialog2.default, {
        open: this.state.open,
        value: this.state.timerValue,
        handleCancel: this.handleCancel,
        handleSubmit: this.handleSubmit,
        min: 0,
        max: this.props.autoUnlockTimeout,
        cancelButtonText: this.props.cancelButtonText,
        submitButtonText: this.props.submitButtonText,
        userQuestion: this.props.userQuestion,
        successfulMessage: this.props.successfulMessage,
        SuccessfulIcon: this.props.SuccessfulIcon,
        UserActionWaitingIcon: this.props.UserActionWaitingIcon,
        buttonLabelStyle: this.props.buttonLabelStyle,
        userActionWaitingColor: this.props.userActionWaitingColor,
        successfulActionColor: this.props.successfulActionColor,
        userQuestionStyle: this.props.userQuestionStyle,
        successfulMessageStyle: this.props.successfulMessageStyle
      });
    }
  }]);

  return InactivityDialog;
}(_react.Component);

InactivityDialog.propTypes = {
  autoUnlockTimeout: _propTypes.number,
  timeout: _propTypes.number,
  beforeInactivityDialogOpen: _propTypes.func,
  beforeInactivityDialogClose: _propTypes.func,
  handleSubmit: _propTypes.func,
  handleCancel: _propTypes.func,
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
InactivityDialog.defaultProps = {
  timeout: DEFAULT_TIMEOUT,
  autoUnlockTimeout: DEFAULT_AUTO_OK_TIMEOUT,
  beforeInactivityDialogClose: function beforeInactivityDialogClose() {},
  beforeInactivityDialogOpen: function beforeInactivityDialogOpen() {},
  handleSubmit: function handleSubmit() {},
  handleCancel: function handleCancel() {},
  cancelButtonText: 'Cancel',
  submitButtonText: 'Submit',
  userQuestion: 'Are you sure you want to submit?',
  successfulMessage: 'Submitted sucessfully',
  SuccessfulIcon: _react2.default.createElement(_lockOpen2.default, { color: '#0D5DB8' }),
  UserActionWaitingIcon: _react2.default.createElement(_lockOutline2.default, { color: '#0D5DB8' }),
  buttonLabelStyle: { color: '#0D5DB8' },
  userActionWaitingColor: '#0D5DB8',
  successfulActionColor: 'green',
  userQuestionStyle: {},
  successfulMessageStyle: {}
};
exports.default = InactivityDialog;