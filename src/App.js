import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InactivityDialog from './InactivityDialog'

class App extends Component {
  componentDidMount() {
    console.log('component mounted') // eslint-disable-line
  }

  handleInactivityTimeoutSubmit = () => {
    console.log('handleInactivityTimeoutSubmit called') // eslint-disable-line
  }

  handleInactivityTimeoutCancel = () => {
    console.log('handleInactivityTimeoutCancel called') // eslint-disable-line
  }

  beforeInactivityDialogOpen = () => {
    console.log('beforeInactivityDialogOpen called') // eslint-disable-line
  }

  beforeInactivityDialogClose = () => {
    console.log('beforeInactivityDialogClose called') // eslint-disable-line
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <InactivityDialog
            handleSubmit={this.handleInactivityTimeoutSubmit}
            handleCancel={this.handleInactivityTimeoutCancel}
            timeout={3000}
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
