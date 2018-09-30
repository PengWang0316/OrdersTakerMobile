import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import { SafeAreaScreen } from '../../app/screens/SafeAreaScreen';

jest.mock('SafeAreaView', () => 'SafeAreaView');
jest.mock('Text', () => 'Text');
jest.mock('../../app/components/DarkerStatusBar', () => 'DarkerStatusBar');
console.log(SafeAreaScreen);
describe('SafeAreaScreen Test', () => {
  test('Snapshot test', () => expect(renderer.create(<SafeAreaScreen><Text>text</Text></SafeAreaScreen>).toJSON()).toMatchSnapshot());
});
