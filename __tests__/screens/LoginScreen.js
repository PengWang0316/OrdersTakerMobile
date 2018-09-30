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

  test('Snapshot with isShowRegisterPanel false', () => expect(renderer.create(<LoginScreen />).toJSON()).toMatchSnapshot());
});
