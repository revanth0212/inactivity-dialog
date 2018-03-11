import React from 'react'
import { string, number, bool, func, node } from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import LockOpen from 'material-ui/svg-icons/action/lock-open'
import LockOutline from 'material-ui/svg-icons/action/lock-outline'
import CircularProgress from 'material-ui/CircularProgress'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import renderIf from 'render-if'

const renderIfValueGreaterThanZero = (value) => renderIf(value > 0)

const renderIfValueIsZero = (value) => renderIf(!value)

const circularProgressBar = (min, max, value) => (
  <CircularProgress
    size={1.5}
    min={min}
    max={max}
    style={{ top: '-52px', margin: '0px', left: '3px' }}
    mode="determinate"
    value={value}
    color="#0D5DB8"
  />
)

const UserQuestion = ({ userQuestion }) => (<h4 style={{ paddingLeft: '15px', position: 'absolute', color: '#0D5DB8' }}>{userQuestion}</h4>)

UserQuestion.propTypes = {
  userQuestion: string,
}

const UnlockSuccessfulMessage = ({ successfulMessage }) => (<h4 style={{ paddingLeft: '15px', position: 'absolute', color: 'green' }}>{successfulMessage}</h4>)

UnlockSuccessfulMessage.propTypes = {
  successfulMessage: string,
}

const TimeoutIndicatorPropTypes = {
  min: number,
  max: number,
  value: number,
  icon: node,
}

const TimeoutIndicator = ({
  icon, min = 0, max = 100, value = 100,
}) => (
  <div style={{ position: 'relative', top: '110px', height: '50px' }}>
    <div style={{
      position: 'relative', height: '50px', width: '50px', margin: 'auto',
    }}
    >
      <FloatingActionButton backgroundColor={value !== 0 ? '#0D5DB8' : 'green'}>
        {icon}
      </FloatingActionButton>
      {renderIfValueGreaterThanZero(value)(circularProgressBar(min, max, value))}
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
}

const InactivityDialogView = ({
  value = 0, open = false, handleCancel, handleSubmit, min = 0, max = 100, cancelButtonText, submitButtonText, userQuestion, successfulMessage,
}) => {
  const icon = value ? <LockOutline /> : <LockOpen />
  const actions = [
    <FlatButton label={cancelButtonText} primary labelStyle={{ color: '#0D5DB8' }} onClick={handleCancel} />,
    <FlatButton
      label={submitButtonText}
      labelPosition="after"
      icon={<LockOpen color="#0D5DB8" />}
      primary
      keyboardFocused
      labelStyle={{ color: '#0D5DB8' }}
      onClick={handleSubmit}
    />,
  ]
  return (
    <Dialog
      open={open}
      actions={value ? actions : []}
    >
      <div style={{ height: '200px' }}>
        {renderIfValueGreaterThanZero(value)(<UserQuestion userQuestion={userQuestion} />)}
        {renderIfValueIsZero(value)(<UnlockSuccessfulMessage successfulMessage={successfulMessage} />)}
        <TimeoutIndicator icon={icon} value={value} min={min} max={max} />
      </div>
    </Dialog>
  )
}

InactivityDialogView.propTypes = InactivityDialogViewPropTypes

export default InactivityDialogView
