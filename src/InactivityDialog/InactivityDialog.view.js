import React from 'react'
import { string, number, bool, func, node, object } from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import renderIf from 'render-if'

const renderIfValueGreaterThanZero = (value) => renderIf(value > 0)

const renderIfValueIsZero = (value) => renderIf(!value)

const circularProgressBar = (min, max, value, color) => (
  <CircularProgress
    size={1.5}
    min={min}
    max={max}
    style={{ top: '-52px', margin: '0px', left: '3px' }}
    mode="determinate"
    value={value}
    color={color}
  />
)

const UserQuestion = ({ userQuestion, color, style }) => (<p style={{ fontSize: '25px', paddingLeft: '15px', position: 'absolute', ...style, color }}>{userQuestion}</p>)

UserQuestion.propTypes = {
  userQuestion: string,
  color: string,
  style: object,
}

const UnlockSuccessfulMessage = ({ successfulMessage, color, style }) => (<p style={{ fontSize: '25px', paddingLeft: '15px', position: 'absolute', ...style, color }}>{successfulMessage}</p>)

UnlockSuccessfulMessage.propTypes = {
  successfulMessage: string,
  color: string,
  style: object,
}

const TimeoutIndicatorPropTypes = {
  min: number,
  max: number,
  value: number,
  icon: node,
  color: string,
}

const TimeoutIndicator = ({
  icon, min = 0, max = 100, value = 100, color,
}) => (
  <div style={{ position: 'relative', top: '110px', height: '50px' }}>
    <div style={{
      position: 'relative', height: '50px', width: '50px', margin: 'auto',
    }}
    >
      <FloatingActionButton backgroundColor={color}>
        {icon}
      </FloatingActionButton>
      {renderIfValueGreaterThanZero(value)(circularProgressBar(min, max, value, color))}
    </div>
  </div>
)

TimeoutIndicator.propTypes = TimeoutIndicatorPropTypes

const InactivityDialogViewPropTypes = {
  value: number,
  open: bool,
  handleCancel: func,
  handleSubmit: func,
  min: number,
  max: number,
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

const InactivityDialogView = ({
  value = 0, open = false, handleCancel, handleSubmit, min = 0, max = 100, cancelButtonText, submitButtonText, userQuestion, successfulMessage, SuccessfulIcon, UserActionWaitingIcon, buttonLabelStyle, userActionWaitingColor, successfulActionColor, userQuestionStyle, successfulMessageStyle,
}) => {
  const icon = value ? UserActionWaitingIcon : SuccessfulIcon
  const actions = [
    <FlatButton label={cancelButtonText} primary labelStyle={buttonLabelStyle} onClick={handleCancel} />,
    <FlatButton
      label={submitButtonText}
      labelPosition="after"
      icon={SuccessfulIcon}
      primary
      keyboardFocused
      labelStyle={buttonLabelStyle}
      onClick={handleSubmit}
    />,
  ]
  return (
    <Dialog
      open={open}
      actions={value ? actions : []}
    >
      <div style={{ height: '200px' }}>
        {renderIfValueGreaterThanZero(value)(<UserQuestion userQuestion={userQuestion} color={userActionWaitingColor} style={userQuestionStyle} />)}
        {renderIfValueIsZero(value)(<UnlockSuccessfulMessage successfulMessage={successfulMessage} color={successfulActionColor} style={successfulMessageStyle} />)}
        <TimeoutIndicator icon={icon} value={value} min={min} max={max} color={value !== 0 ? userActionWaitingColor : successfulActionColor} />
      </div>
    </Dialog>
  )
}

InactivityDialogView.propTypes = InactivityDialogViewPropTypes

export default InactivityDialogView
