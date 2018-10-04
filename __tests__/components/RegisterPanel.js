import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { RegisterPanel } from '../../app/components/RegisterPanel/RegisterPanel';

jest.mock('../../app/actions/UserActions', () => ({ checkUsernameAvailable: jest.fn().mockReturnValue(Promise.resolve(true)) }));

describe('RegisterPanel', () => {
  const defaultProps = {
    registerUser: jest.fn(),
    navigation: { goBack: jest.fn() },
  };
  const getShallowComponent = (props = defaultProps) => shallow(<RegisterPanel {...props} />);

  test('Initial states', () => {
    const component = getShallowComponent();
    const {
      username,
      password,
      repeatPassword,
      email,
      isSubmitted,
      isReady,
      isChecking,
      isNameAvalible,
      usernameErrorMessage,
      passwordErrorMessage,
      emailErrorMessage,
      isWaiting,
    } = component.state();

    expect(username).toBe('');
    expect(password).toBe('');
    expect(repeatPassword).toBe('');
    expect(email).toBe('');
    expect(isSubmitted).toBe(false);
    expect(isReady).toBe(false);
    expect(isChecking).toBe(false);
    expect(isNameAvalible).toBe(false);
    expect(usernameErrorMessage).toBe(false);
    expect(passwordErrorMessage).toBe(false);
    expect(emailErrorMessage).toBe(false);
    expect(isWaiting).toBe(false);
  });

  test('handleRegisterBtnClick', () => {
    const component = getShallowComponent();
    component.setState({
      isReady: true, isWaiting: false, username: 'username', password: 'password', email: 'email',
    });
    component.instance().handleRegisterBtnClick();

    expect(component.state('isReady')).toBe(false);
    expect(component.state('isWaiting')).toBe(true);
    expect(defaultProps.registerUser).toHaveBeenCalledTimes(1);
    expect(defaultProps.registerUser).toHaveBeenLastCalledWith({
      username: 'username', password: 'password', email: 'email',
    });
    expect(defaultProps.navigation.goBack).toHaveBeenCalledTimes(1);
  });

  test('handleInputTextChange target username match USERNAME_REGEXP', () => {
    const component = getShallowComponent();
    component.setState({ usernameErrorMessage: true, isReady: true, isNameAvalible: true });
    component.find('Input').at(0).simulate('changeText', 'df#df');
    // component.instance().handleInputTextChange('username', 'df#df');

    expect(component.state('username')).toBe('df#df');
    expect(component.state('usernameErrorMessage')).toBe('Characters, number, _ and @');
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isNameAvalible')).toBe(false);
  });

  test('handleInputTextChange target username does not match USERNAME_REGEXP', () => {
    jest.useFakeTimers();
    const UserActions = require('../../app/actions/UserActions');
    clearTimeout = jest.fn();
    const component = getShallowComponent();
    component.setState({
      usernameErrorMessage: true, isReady: false, isNameAvalible: false, isChecking: false, password: 'pw', repeatPassword: 'repw', email: 'email',
    });
    component.instance().handleInputTextChange('username', 'dfdf124_df@');

    jest.runAllTimers();
    expect(clearTimeout).not.toHaveBeenCalled();
    expect(component.state('username')).toBe('dfdf124_df@');
    expect(component.state('usernameErrorMessage')).toBe(false);
    expect(component.state('isReady')).toBe(true);
    // expect(UserActions.checkUsernameAvailable).toHaveBeenCalledTimes(1); jest.mock is not hoisted automatically. So, I cannot test this.
    component.instance().handleInputTextChange('username', 'dfdf124_df@');
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  test('handleInputTextChange target password value equal repeatPassword', () => {
    const component = getShallowComponent();
    component.setState({ repeatPassword: 'password', passwordErrorMessage: false, isReady: true });
    component.find('Input').at(1).simulate('changeText', 'password');
    // component.instance().handleInputTextChange('password', 'password');

    expect(component.state('password')).toBe('password');
    expect(component.state('passwordErrorMessage')).toBe(false);
    expect(component.state('isReady')).toBe(false);
  });

  test('handleInputTextChange target password value not equal repeatPassword', () => {
    const component = getShallowComponent();
    component.setState({ repeatPassword: 'reassword', passwordErrorMessage: false, isReady: true });
    component.instance().handleInputTextChange('password', 'password');

    expect(component.state('password')).toBe('password');
    expect(component.state('passwordErrorMessage')).toBe('Passwords should be same');
    expect(component.state('isReady')).toBe(false);
  });

  test('handleInputTextChange target repeatPassword value equal password', () => {
    const component = getShallowComponent();
    component.setState({ password: 'repeatPassword', passwordErrorMessage: false, isReady: true });
    component.find('Input').at(2).simulate('changeText', 'repeatPassword');
    // component.instance().handleInputTextChange('repeatPassword', 'repeatPassword');

    expect(component.state('repeatPassword')).toBe('repeatPassword');
    expect(component.state('passwordErrorMessage')).toBe(false);
    expect(component.state('isReady')).toBe(false);
  });

  test('handleInputTextChange target repeatPassword value not equal password', () => {
    const component = getShallowComponent();
    component.setState({ password: 'peassword', passwordErrorMessage: false, isReady: true });
    component.instance().handleInputTextChange('repeatPassword', 'password');

    expect(component.state('repeatPassword')).toBe('password');
    expect(component.state('passwordErrorMessage')).toBe('Passwords should be same');
    expect(component.state('isReady')).toBe(false);
  });

  test('handleInputTextChange target email match EMAIL_REGEXP', () => {
    const component = getShallowComponent();
    component.setState({ emailErrorMessage: false });
    component.find('Input').at(3).simulate('changeText', 'df@df.com');
    // component.instance().handleInputTextChange('email', 'df@df.com');

    expect(component.state('email')).toBe('df@df.com');
    expect(component.state('emailErrorMessage')).toBe(false);
  });

  test('handleInputTextChange target email not match EMAIL_REGEXP', () => {
    const component = getShallowComponent();
    component.setState({ emailErrorMessage: false });
    component.instance().handleInputTextChange('email', 'df@dfcom');

    expect(component.state('email')).toBe('df@dfcom');
    expect(component.state('emailErrorMessage')).toBe('Wrong email address');
    component.instance().handleInputTextChange('', 'df@dfcom'); // for the switch default
  });

  test('Snapshot', () => expect(renderer.create(<RegisterPanel />).toJSON()).toMatchSnapshot());
});
