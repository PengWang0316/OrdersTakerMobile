import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { LoginScreen } from '../../app/screens/LoginScreen';

jest.mock('@kevinwang0316/react-native-snackbar-component', () => 'Snackbar');
jest.mock('../../app/components/LoginPanel', () => 'LoginPanel');
jest.mock('../../app/components/RegisterPanel', () => 'RegisterPanel');
jest.mock('../../app/screens/SafeAreaScreen', () => 'SafeAreaScreen');

describe('LoginScreen', () => {
  const getShallowComponent = () => shallow(<LoginScreen />);

  test('Initial states', () => {
    const component = getShallowComponent();
    const {
      isShowSnackbar, snackbarMessage, snackbarBgColor, isShowRegisterPanel,
    } = component.state();

    expect(isShowSnackbar).toBe(false);
    expect(isShowRegisterPanel).toBe(false);
    expect(snackbarMessage).toBe('');
    expect(snackbarBgColor).toBe('');
  });

  test('snackbarUpdateCallback', () => {
    jest.useFakeTimers();
    const component = getShallowComponent();
    component.instance().snackbarUpdateCallback({ isShowSnackbar: true, snackbarMessage: 'message', snackbarBgColor: 'bgColor' });

    expect(component.state('isShowSnackbar')).toBe(true);
    expect(component.state('snackbarMessage')).toBe('message');
    expect(component.state('snackbarBgColor')).toBe('bgColor');

    jest.runAllTimers();
    expect(component.state('isShowSnackbar')).toBe(false);
  });

  test('handlePanelSwitch', () => {
    const component = getShallowComponent();
    expect(component.state('isShowRegisterPanel')).toBe(false);
    component.instance().handlePanelSwitch();
    expect(component.state('isShowRegisterPanel')).toBe(true);
  });

  test('Snapshot with isShowRegisterPanel false', () => expect(renderer.create(<LoginScreen />).toJSON()).toMatchSnapshot());
  test('Snapshot with isShowRegisterPanel true ans isShowSnackbar true', () => {
    const component = getShallowComponent();
    component.setState({
      isShowSnackbar: true,
      isShowRegisterPanel: true,
    });
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
});
