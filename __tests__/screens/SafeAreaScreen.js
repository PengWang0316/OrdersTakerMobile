import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import { SafeAreaScreen } from '../../app/screens/SafeAreaScreen';

jest.mock('SafeAreaView', () => 'SafeAreaView');
jest.mock('Text', () => 'Text');

describe('SafeAreaScreen Test', () => {
  test('Snapshot test', () => expect(renderer.create(<SafeAreaScreen><Text>text</Text></SafeAreaScreen>).toJSON()).toMatchSnapshot());
});
