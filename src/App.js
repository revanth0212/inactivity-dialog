import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InactivityDialog from './InactivityDialog'

class App extends Component {
  render() {
    return (
      <div>
        <h3> Dont click or move mouse for 10 seconds for the Inactivity Dialog to show up.</h3>
        <h3>
          You should be presented with Options to:
          <ul>
            <li>stay which will reset the timer for another 10 seconds of inactivity</li>
            <li>leave which will cancel the timer</li>
          </ul>
        </h3>
        <MuiThemeProvider>
          <InactivityDialog
            handleSubmit={this.handleInactivityTimeoutSubmit}
            handleCancel={this.handleInactivityTimeoutCancel}
            timeout={10000}
            autoUnlockTimeout={60}
            beforeInactivityDialogOpen={this.beforeInactivityDialogOpen}
            beforeInactivityDialogClose={this.beforeInactivityDialogClose}
            cancelButtonText="No, Stay"
            submitButtonText="Yes, Leave"
            successfulMessage="Successfully auto clicked submit button."
            userQuestion="Do you want to perform certain action?"
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
