import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import SnackBar from '@kevinwang0316/react-native-snackbar-component';


import Theme from '../Theme';
import SafeAreaScreen from './SafeAreaScreen';
import LoginForm from '../components/LoginForm/LoginForm';
import SocialLoginPanel from '../components/SocialLoginPanel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.panelBackgroundColor,
  },
  internalContainer: {
    width: '75%',
  },
  deviderView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
  },
  devider: {
    backgroundColor: Theme.primary.main,
    height: 1,
    width: '38%',
  },
});

type Props = {
  navigation: Object
};

type States = {
  isShowSnackbar: boolean,
  snackbarMessage: string,
  snackbarBgColor: string,
}

const AUTO_HIDDING_TIME = 1500;

/**
 * The component that contains login form and register form.
 */
export class LoginScreen extends Component<Props, States> {
  state = {
    isShowSnackbar: false,
    snackbarMessage: '',
    snackbarBgColor: '',
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
    const { isShowSnackbar, snackbarMessage, snackbarBgColor } = this.state;
    return (
      <SafeAreaScreen>
        <View style={styles.internalContainer}>
          <SocialLoginPanel />

          <View style={styles.deviderView}>
            <Divider style={styles.devider} />
            <Text style={styles.title}>or</Text>
            <Divider style={styles.devider} />
          </View>

          <LoginForm handleSnackbarUpdate={this.snackbarUpdateCallback} />
        </View>
        {/* <Button onPress={() => navigation.goBack()} title="Go Back" /> */}
        <SnackBar
          visible={isShowSnackbar}
          textMessage={snackbarMessage}
          backgroundColor={snackbarBgColor}
          autoHidingTime={AUTO_HIDDING_TIME}
        />
      </SafeAreaScreen>
    );
  }
}

export default LoginScreen;
