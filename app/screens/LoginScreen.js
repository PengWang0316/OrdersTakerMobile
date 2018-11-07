import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SnackBar from '@kevinwang0316/react-native-snackbar-component';

import SafeAreaScreen from './SafeAreaScreen';
import LoginPanel from '../components/LoginPanel';
import RegisterPanel from '../components/RegisterPanel';
import Theme from '../Theme';
// import LoginScreenContext from '../contexts/LoginScreenContext';

type Props = {
  navigation: Object,
};

type States = {
  isShowSnackbar: boolean,
  snackbarMessage: string,
  snackbarBgColor: string,
  isShowRegisterPanel: boolean,
};

const AUTO_HIDDING_TIME = 1500;
const REGISTER_TEXT = 'Do Not Have An Account? Register One';
const LOGIN_TEXT = 'Have An Account Already? Go To Login';

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
   * Somehow the test will fail if the Component that extends from Component does not call the super(props) manually.
   * It could relate to babel, react-native, or metro-react-native-babel-preset.
   * Will be removed if the problem disappear in the future.
   * @param {object} props has all props value
   */
  constructor(props) {
    super(props);
  }

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
   * Set the isShowRegisterPanel state to the opposite value.
   * @return {null} No return.
   */
  handlePanelSwitch = () => this.setState(({ isShowRegisterPanel }) => ({ isShowRegisterPanel: !isShowRegisterPanel }));

  /**
   * Render function for the component.
   * @return {jsx} Return jsx.
   */
  render() {
    const {
      isShowSnackbar, snackbarMessage, snackbarBgColor, isShowRegisterPanel,
    } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaScreen>
        {/* <LoginScreenContext.Provider value={{ handleSnackbarUpdate: this.snackbarUpdateCallback }}> */}
        {!isShowRegisterPanel && <LoginPanel handleSnackbarUpdate={this.snackbarUpdateCallback} navigation={navigation} />}
        {/* <Button onPress={() => navigation.goBack()} title="Go Back" /> */}
        {isShowRegisterPanel && <RegisterPanel handleSnackbarUpdate={this.snackbarUpdateCallBack} navigation={navigation} />}

        <View>
          <TouchableOpacity
            onPress={this.handlePanelSwitch}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: Theme.primary.light }}>{isShowRegisterPanel ? LOGIN_TEXT : REGISTER_TEXT}</Text>
          </TouchableOpacity>
        </View>
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
