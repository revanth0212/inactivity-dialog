import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InactivityDialog from './InactivityDialog'

const TIMEOUT = 10000
const AUTO_UNLOCK_TIMEOUT = 60

const instructions = () => (
  <div>
    <h3> Dont click or move mouse for 10 seconds for the Inactivity Dialog to show up.</h3>
    <h3>
      You should be presented with Options to:
      <ul>
        <li>stay which will reset the timer for another 10 seconds of inactivity</li>
        <li>leave which will cancel the timer</li>
      </ul>
    </h3>
  </div>
)

// The fns below are left as a noop, modify as you please
const handleInactivityTimeoutSubmit = () => {}
const handleInactivityTimeoutCancel = () => {}
const beforeInactivityDialogOpen = () => {}
const beforeInactivityDialogClose = () => {}

const App = () => (
  <div>
    {instructions()}
    <MuiThemeProvider>
      <InactivityDialog
        handleSubmit={handleInactivityTimeoutSubmit()}
        handleCancel={handleInactivityTimeoutCancel()}
        timeout={TIMEOUT}
        autoUnlockTimeout={AUTO_UNLOCK_TIMEOUT}
        beforeInactivityDialogOpen={beforeInactivityDialogOpen()}
        beforeInactivityDialogClose={beforeInactivityDialogClose()}
        cancelButtonText="No, Stay"
        submitButtonText="Yes, Leave"
        successfulMessage="Successfully auto clicked submit button."
        userQuestion="Do you want to perform certain action?"
      />
    </MuiThemeProvider>
  </div>
)

export default App
