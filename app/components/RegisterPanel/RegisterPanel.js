import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import styles from './Styles';
import { checkUsernameAvailable, registerUser } from '../../actions/UserActions';

const USERNAME_REGEXP = /[^\w\d_@]/g;
const EMAIL_REGEXP = /^[\w\d]+@.+\..+/g;
const USERNAME_TIP_MESSAGE = 'Characters, number, _ and @';
const USERNAME_NOAVALIABLE_MESSAGE = 'The user name laready exsits';
const PASSWORD_TIP_MESSAGE = 'Passwords should be same';
const EMAIL_TIP_MESSAGE = 'Wrong email address';

type States = {
  username: string,
  password: string,
  repeatPassword: string,
  email: string,
  isSubmitted: boolean,
  isReady: boolean,
  isChecking: boolean,
  isNameAvalible: boolean,
  usernameErrorMessage: boolean,
  passwordErrorMessage: boolean,
  emailErrorMessage: boolean,
  isWaiting: boolean,
};

/**
 * The Register panel component
 */
export class RegisterPanel extends Component<null, States> {
  state = {
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    isSubmitted: false,
    isReady: false,
    usernameErrorMessage: false,
    passwordErrorMessage: false,
    emailErrorMessage: false,
    isChecking: false,
    isNameAvalible: false,
    isWaiting: false,
  };

  /**
   * Set username state and call checkAllState function.
   * @param {string} target is the target's state name.
   * @param {string} value is the target's text value.
   * @return {null} No return.
   */
  handleInputTextChange = (target, value) => this.setState({ [target]: value }, () => {

    // Do the validation
    switch (target) {
      case 'username':
        this.setState({ usernameErrorMessage: false, isReady: false, isNameAvalible: false }); // Erasing the error state and check it again. If username is changed, alway set the isReady to false and let the checking function callback to decide it state.
        if (value.match(USERNAME_REGEXP)) {
          this.setState({ usernameErrorMessage: USERNAME_TIP_MESSAGE });
        } else {
          // Setting up a timeout function to check the avalibility for the username.
          if (this.checkUsernameTimeout) clearTimeout(this.checkUsernameTimeout); // If the check function has already been schulded, clear the old one.
          this.checkUsernameTimeout = setTimeout(() => {
            this.setState({ isChecking: true });
            checkUsernameAvailable(value).then(isAvalible => this.setState(({
              username, password, repeatPassword, email,
            }) => ({
              isReady: !!(username && password && repeatPassword && email && !!isAvalible),
              isChecking: false,
              isNameAvalible: !!isAvalible,
              usernameErrorMessage: isAvalible ? false : USERNAME_NOAVALIABLE_MESSAGE,
            })));
          }, 1000);
        }
        break;
      case 'password':
        this.setState({ passwordErrorMessage: false }); // Erasing the error state and check it again.
        if (value !== this.state.repeatPassword) {
          this.setState({ passwordErrorMessage: PASSWORD_TIP_MESSAGE, isReady: false });
        }
        break;
      case 'repeatPassword':
        this.setState({ passwordErrorMessage: false }); // Erasing the error state and check it again.
        if (value !== this.state.password) {
          this.setState({ passwordErrorMessage: PASSWORD_TIP_MESSAGE, isReady: false });
        }
        break;
      case 'email':
        this.setState({ emailErrorMessage: false }); // Erasing the error state and check it again.
        if (!value.match(EMAIL_REGEXP)) {
          this.setState({ emailErrorMessage: EMAIL_TIP_MESSAGE, isReady: false });
        }
        break;
      default:
        break;
    }
    // If all field is not empty and no error message shows up, set the isReady to true.
    this.setState(({
      username, password, repeatPassword, email, usernameErrorMessage, passwordErrorMessage, emailErrorMessage,
    }) => {
      return ({ isReady: !!(username && password && repeatPassword && email) && !(usernameErrorMessage || passwordErrorMessage || emailErrorMessage) });
    });
  });

  /**
   * Disable the register button, set isWaiting to true, and call the registerUser function in UserActions.
   * @return {null} No return.
   */
  handleRegisterBtnClick = () => {
    this.setState({
      isReady: false,
      isWaiting: true,
    });
    this.props.registerUser({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    });
  };

  /**
   * THe render method
   * @return {jsx} Return jsx for the component.
   */
  render() {
    const {
      username, password, repeatPassword, email, isSubmitted, isReady, isChecking, isWaiting,
      usernameErrorMessage, passwordErrorMessage, emailErrorMessage, isNameAvalible,
    } = this.state;
    return (
      <View style={styles.internalContainer}>
        <View>
          <Text style={styles.title}>Username Login</Text>
        </View>

        <View style={styles.inputView}>
          <Input
            onChangeText={text => this.handleInputTextChange('username', text)}
            editable={!isWaiting}
            placeholder="Username"
            value={username}
            leftIcon={(
              <Icon
                type="font-awesome"
                name="user-o"
                size={18}
                color="gray"
              />
            )}
            rightIcon={(
              <Fragment>
                {isChecking && (
                  <Animatable.View
                    animation="rotate"
                    easing="linear"
                    iterationCount="infinite"
                  >
                    <Icon
                      type="evilicon"
                      name="spinner-3"
                      size={18}
                      color="gray"
                    />
                  </Animatable.View>
                )}
                {isNameAvalible && <Icon name="check-circle" color="green" />}
              </Fragment>
            )}
            errorMessage={usernameErrorMessage}
          />
        </View>

        <View style={styles.inputView}>
          <Input
            onChangeText={text => this.handleInputTextChange('password', text)}
            editable={!isWaiting}
            value={password}
            secureTextEntry
            placeholder="Password"
            leftIcon={(
              <Icon
                type="feather"
                name="lock"
                size={18}
                color="gray"
              />
            )}
          />
        </View>

        <View style={styles.inputView}>
          <Input
            onChangeText={text => this.handleInputTextChange('repeatPassword', text)}
            editable={!isWaiting}
            value={repeatPassword}
            secureTextEntry
            placeholder="Repeat Password"
            leftIcon={(
              <Icon
                name="repeat"
                size={18}
                color="gray"
              />
            )}
            errorMessage={passwordErrorMessage}
          />
        </View>

        <View style={styles.inputView}>
          <Input
            onChangeText={text => this.handleInputTextChange('email', text)}
            editable={!isWaiting}
            value={email}
            placeholder="Email"
            leftIcon={(
              <Icon
                type="material-icons"
                name="mail-outline"
                size={18}
                color="gray"
              />
            )}
            errorMessage={emailErrorMessage}
          />
        </View>

        <View style={styles.buttonView}>
          <Button
            disabled={isSubmitted || !isReady}
            title="LOGIN"
            onPress={this.handleRegisterBtnClick}
            buttonStyle={styles.registerBtn}
          />
        </View>
      </View>
    );
  }
}
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
});
export default connect(null, mapDispatchToProps)(RegisterPanel);
