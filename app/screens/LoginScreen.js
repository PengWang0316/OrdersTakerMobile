import React, { Component } from 'react';

import SnackBar from '@kevinwang0316/react-native-snackbar-component';

import SafeAreaScreen from './SafeAreaScreen';
import LoginPanel from '../components/LoginPanel';
// import LoginScreenContext from '../contexts/LoginScreenContext';

type Props = {
  navigation: Object
};

type States = {
  isShowSnackbar: boolean,
  snackbarMessage: string,
  snackbarBgColor: string,
  isShowRegisterPanel: boolean,
};

const AUTO_HIDDING_TIME = 1500;

/**
 * The component that contains login form and register form.
 */
export class LoginScreen extends Component<Props, States> {
  state = {
    isShowSnackbar: false,
    snackbarMessage: '',
    snackbarBgColor: '',
    isShowRegisterPanel: false,
  };

  /**
   * Updating the states that relates to the snackbar.
   * @param {object} snackbarStates contains isShowSnackbar, snackbarMessage, and snackbarBgColor.
   * @return {null} No return.
   */
  snackbarUpdateCallback = snackbarStates => this.setState(
    snackbarStates,
    () => setTimeout(() => this.setState({ isShowSnackbar: false }), AUTO_HIDDING_TIME + 100),
  );

  /**
   * Render function for the component.
   * @return {jsx} Return jsx.
   */
  render() {
    const {
      isShowSnackbar, snackbarMessage, snackbarBgColor, isShowRegisterPanel,
    } = this.state;
    return (
      <SafeAreaScreen>
        {/* <LoginScreenContext.Provider value={{ handleSnackbarUpdate: this.snackbarUpdateCallback }}> */}
        {!isShowRegisterPanel && <LoginPanel handleSnackbarUpdate={this.snackbarUpdateCallback} />}
        {/* <Button onPress={() => navigation.goBack()} title="Go Back" /> */}
        <SnackBar
          visible={isShowSnackbar}
          textMessage={snackbarMessage}
          backgroundColor={snackbarBgColor}
          autoHidingTime={AUTO_HIDDING_TIME}
        />
        {/* </LoginScreenContext.Provider> */}
      </SafeAreaScreen>
    );
  }
}

export default LoginScreen;
