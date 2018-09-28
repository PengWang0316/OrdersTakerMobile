import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { LoginForm } from '../../app/components/LoginForm/LoginForm';

jest.mock('Text', () => 'Text');
jest.mock('View', () => 'View');
// jest.mock('Input', () => 'Input');
// jest.mock('Icon', () => 'Icon');
// jest.mock('Button', () => 'Button');

describe('LoginForm', () => {
  const defaultProps = {
    user: {},
    handleSnackbarUpdate: jest.fn(),
    emptyUser: jest.fn(),
    loginWithPassword: jest.fn(),
  };
  const getShallowComponent = (props = defaultProps) => shallow(<LoginForm {...props} />);

  test('Initial states', () => {
    const component = getShallowComponent();
    const {
      username, password, isReady, isSubmitted,
    } = component.instance().state;

    expect(username).toBe('');
    expect(password).toBe('');
    expect(isReady).toBe(false);
    expect(isSubmitted).toBe(false);
  });

  test('getDerivedStateFromProps isSubmitted false', () => expect(LoginForm.getDerivedStateFromProps(null, { isSubmitted: false })).toBeNull());
  test('getDerivedStateFromProps isSubmitted is true and user.isFail is false', () => expect(LoginForm.getDerivedStateFromProps({ user: { isFail: false } }, { isSubmitted: true })).toBeNull());
  test('getDerivedStateFromProps isSubmitted is true and user.isFail is true', () => {
    const mockUpdateFn = jest.fn();
    const mockEmptyUserFn = jest.fn();
    const nextProps = {
      user: { isFail: true },
      handleSnackbarUpdate: mockUpdateFn,
      emptyUser: mockEmptyUserFn,
    };
    const prevState = { isSubmitted: true };
    expect(LoginForm.getDerivedStateFromProps(nextProps, prevState)).toEqual({ isSubmitted: false })
    expect(mockUpdateFn).toHaveBeenCalledTimes(1);
    expect(mockUpdateFn).toHaveBeenLastCalledWith({ isShowSnackbar: true, snackbarMessage: 'Wrong username or password', snackbarBgColor: '#ff1744' });
    expect(mockEmptyUserFn).toHaveBeenCalledTimes(1);
  });

  test('handleLoginClick', () => {
    const component = getShallowComponent();
    const someStates = { username: 'username', password: 'password' };
    component.setState(someStates);
    component.instance().handleLoginClick();
    expect(component.state('isSubmitted')).toBe(true);
    expect(defaultProps.loginWithPassword).toHaveBeenCalledTimes(1);
    expect(defaultProps.loginWithPassword).toHaveBeenLastCalledWith(someStates);
  });

  test('handleUsernameTextChange text length equal 0', () => {
    const component = getShallowComponent();
    const text = '';
    component.instance().handleUsernameTextChange(text);
    expect(component.state('username')).toBe(text);
    expect(component.state('isReady')).toBe(false);
  });

  test('handleUsernameTextChange passowrd length equal 0', () => {
    const component = getShallowComponent();
    const text = 'text';
    component.setState({ password: '' });
    component.instance().handleUsernameTextChange(text);
    expect(component.state('username')).toBe(text);
    expect(component.state('isReady')).toBe(false);
  });

  test('handleUsernameTextChange username and password length not equal 0', () => {
    const component = getShallowComponent();
    const text = 'text';
    component.setState({ password: 'password' });
    component.instance().handleUsernameTextChange(text);
    expect(component.state('username')).toBe(text);
    expect(component.state('isReady')).toBe(true);
  });

  test('handlePasswordTextChange password length equal 0', () => {
    const component = getShallowComponent();
    const password = '';
    component.instance().handlePasswordTextChange(password);
    expect(component.state('password')).toBe(password);
    expect(component.state('isReady')).toBe(false);
  });

  test('handlePasswordTextChange username length equal 0', () => {
    const component = getShallowComponent();
    const password = 'password';
    component.setState({ username: '' });
    component.instance().handlePasswordTextChange(password);
    expect(component.state('password')).toBe(password);
    expect(component.state('isReady')).toBe(false);
  });

  test('handlePasswordTextChange username and password length not equal 0', () => {
    const component = getShallowComponent();
    const password = 'password';
    component.setState({ username: 'username' });
    component.instance().handlePasswordTextChange(password);
    expect(component.state('password')).toBe(password);
    expect(component.state('isReady')).toBe(true);
  });

  test('Snapshot', () => expect(renderer.create(<LoginForm {...defaultProps} />).toJSON()).toMatchSnapshot());
});
