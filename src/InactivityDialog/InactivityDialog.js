import React, { Component } from 'react'
import { func, number, string, node, object } from 'prop-types'
import LockOpen from 'material-ui/svg-icons/action/lock-open'
import LockOutline from 'material-ui/svg-icons/action/lock-outline'
import InactivityDialogView from './InactivityDialog.view'

const DEFAULT_TIMEOUT = 18000 // 3 minutes of inactivity before the dialog opens up

const DEFAULT_AUTO_OK_TIMEOUT = 60 // User gets 60 seconds before the lot auto unlocks.

const DEFAULT_TIMER_CHANGE_TIMEOUT = 1000 // 1000ms = 1sec. Timer value changes every 1 second.

const DEFAULT_SUCCESSFUL_DIALOG_TIMEOUT = 2000 // Show successful message for 2 seconds.

class InactivityDialog extends Component {
  static propTypes = {
    autoUnlockTimeout: number,
    timeout: number,
    beforeInactivityDialogOpen: func,
    beforeInactivityDialogClose: func,
    handleSubmit: func,
    handleCancel: func,
    cancelButtonText: string,
    submitButtonText: string,
    userQuestion: string,
    successfulMessage: string,
    SuccessfulIcon: node,
    UserActionWaitingIcon: node,
    buttonLabelStyle: object,
    userActionWaitingColor: string,
    successfulActionColor: string,
    userQuestionStyle: object,
    successfulMessageStyle: object,
  }

  static defaultProps = {
    timeout: DEFAULT_TIMEOUT,
    autoUnlockTimeout: DEFAULT_AUTO_OK_TIMEOUT,
    beforeInactivityDialogClose: () => {},
    beforeInactivityDialogOpen: () => {},
    handleSubmit: () => {},
    handleCancel: () => {},
    cancelButtonText: 'Cancel',
    submitButtonText: 'Submit',
    userQuestion: 'Are you sure you want to submit?',
    successfulMessage: 'Submitted sucessfully',
    SuccessfulIcon: <LockOpen color="#0D5DB8" />,
    UserActionWaitingIcon: <LockOutline color="#0D5DB8" />,
    buttonLabelStyle: { color: '#0D5DB8' },
    userActionWaitingColor: '#0D5DB8',
    successfulActionColor: 'green',
    userQuestionStyle: {},
    successfulMessageStyle: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      timerValue: props.autoUnlockTimeout || DEFAULT_AUTO_OK_TIMEOUT,
    }
  }

  componentDidMount() {
    this.timerId = window.setTimeout(this.openInactivityDialog, this.props.timeout)
    this.setKeyboardAndMouseEventListeners()
  }

  componentWillUnmount() {
    this.prepForDialogClose()
    this.clearKeyboardAndMouseEventListeners()
  }

  setKeyboardAndMouseEventListeners() {
    window.addEventListener('keypress', this.restartTimer)
    window.addEventListener('mousemove', this.restartTimer)
  }

  clearKeyboardAndMouseEventListeners() {
    window.removeEventListener('keypress', this.restartTimer)
    window.removeEventListener('mousemove', this.restartTimer)
  }

  restartTimer = () => {
    if (this.state.timerValue) {
      this.timerId && window.clearTimeout(this.timerId)
      this.timerId = window.setTimeout(this.openInactivityDialog, this.props.timeout)
    }
  }

  openInactivityDialog = () => {
    this.clearKeyboardAndMouseEventListeners()
    this.props.beforeInactivityDialogOpen()
    this.setState({ open: true, timerValue: this.props.autoUnlockTimeout })
    this.intervalId = window.setInterval(this.changeTimerClock, DEFAULT_TIMER_CHANGE_TIMEOUT)
  }

  closeInactivityDialog = () => {
    this.props.beforeInactivityDialogClose()
    this.setState({ open: false, timerValue: 0 })
  }

  changeTimerClock = () => {
    const presentValue = this.state.timerValue
    if (presentValue > 0) {
      this.setState({ timerValue: presentValue - 1 })
    } else {
      this.handleSubmit()
    }
  }

  prepForDialogClose = () => {
    this.timerId && window.clearTimeout(this.timerId)
    this.intervalId && window.clearInterval(this.intervalId)
    this.submitTimeoutId && window.clearTimeout(this.submitTimeoutId)
  }

  handleCancel = () => {
    this.prepForDialogClose()
    this.closeInactivityDialog()
    this.setKeyboardAndMouseEventListeners()
    this.timerId = window.setTimeout(this.openInactivityDialog, this.props.timeout)
    this.props.handleCancel()
  }

  handleSubmit = () => {
    this.setState({ open: true, timerValue: 0 })
    this.submitTimeoutId = window.setTimeout(() => {
      this.prepForDialogClose()
      this.closeInactivityDialog()
      this.clearKeyboardAndMouseEventListeners()
      this.props.handleSubmit()
    }, DEFAULT_SUCCESSFUL_DIALOG_TIMEOUT)
    this.intervalId && window.clearInterval(this.intervalId)
  }

  render() {
    return (
      <InactivityDialogView
        open={this.state.open}
        value={this.state.timerValue}
        handleCancel={this.handleCancel}
        handleSubmit={this.handleSubmit}
        min={0}
        max={this.props.autoUnlockTimeout}
        cancelButtonText={this.props.cancelButtonText}
        submitButtonText={this.props.submitButtonText}
        userQuestion={this.props.userQuestion}
        successfulMessage={this.props.successfulMessage}
        SuccessfulIcon={this.props.SuccessfulIcon}
        UserActionWaitingIcon={this.props.UserActionWaitingIcon}
        buttonLabelStyle={this.props.buttonLabelStyle}
        userActionWaitingColor={this.props.userActionWaitingColor}
        successfulActionColor={this.props.successfulActionColor}
        userQuestionStyle={this.props.userQuestionStyle}
        successfulMessageStyle={this.props.successfulMessageStyle}
      />
    )
  }
}

export default InactivityDialog
