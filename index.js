'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _InactivityDialog = require('./InactivityDialog');

var _InactivityDialog2 = _interopRequireDefault(_InactivityDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          ' Dont click or move mouse for 10 seconds for the Inactivity Dialog to show up.'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'You should be presented with Options to:',
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              'stay which will reset the timer for another 10 seconds of inactivity'
            ),
            _react2.default.createElement(
              'li',
              null,
              'leave which will cancel the timer'
            )
          )
        ),
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          null,
          _react2.default.createElement(_InactivityDialog2.default, {
            handleSubmit: this.handleInactivityTimeoutSubmit,
            handleCancel: this.handleInactivityTimeoutCancel,
            timeout: 10000,
            autoUnlockTimeout: 60,
            beforeInactivityDialogOpen: this.beforeInactivityDialogOpen,
            beforeInactivityDialogClose: this.beforeInactivityDialogClose,
            cancelButtonText: 'No, Stay',
            submitButtonText: 'Yes, Leave',
            successfulMessage: 'Successfully auto clicked submit button.',
            userQuestion: 'Do you want to perform certain action?'
          })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
  var div = document.createElement('div');
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), div);
  _reactDom2.default.unmountComponentAtNode(div);
});
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InactivityDialog = require('./InactivityDialog');

var _InactivityDialog2 = _interopRequireDefault(_InactivityDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _InactivityDialog2.default;
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _registerServiceWorker = require('./registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));
(0, _registerServiceWorker2.default)();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = register;
exports.unregister = unregister;
// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
// [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' ||
// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    var publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', function () {
      var swUrl = process.env.PUBLIC_URL + '/service-worker.js';

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(function () {
          console.log('This web app is being served cache-first by a service ' + 'worker. To learn more, visit https://goo.gl/SC7cgQ');
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker.register(swUrl).then(function (registration) {
    registration.onupdatefound = function () {
      var installingWorker = registration.installing;
      installingWorker.onstatechange = function () {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // At this point, the old content will have been purged and
            // the fresh content will have been added to the cache.
            // It's the perfect time to display a "New content is
            // available; please refresh." message in your web app.
            console.log('New content is available; please refresh.');
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.');
          }
        }
      };
    };
  }).catch(function (error) {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl).then(function (response) {
    // Ensure service worker exists, and that we really are getting a JS file.
    if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then(function (registration) {
        registration.unregister().then(function () {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl);
    }
  }).catch(function () {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}
