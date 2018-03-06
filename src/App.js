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
        <h3> Dont click or move mouse for 30 seconds for the Inactivity Dialog to show up.</h3>
        <h3>
          You should be presented with Options to:
          <ul>
            <li>stay which will reset the timer</li>
            <li>leave which will cancel the timer</li>
          </ul>
        </h3>
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
