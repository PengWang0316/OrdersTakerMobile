import React from 'react';
import renderer from 'react-test-renderer';

import { SocialLoginPanel } from '../../app/components/SocialLoginPanel/SocialLoginPanel';

jest.mock('Text', () => 'Text');
jest.mock('View', () => 'View');
// jest.mock('react-native-elements', { Icon: () => 'Icon', Button: () => 'Button' });

describe('SocialLoginPanel Test', () => {
  test('Snapshot', () => expect(renderer.create(<SocialLoginPanel />).toJSON()).toMatchSnapshot());
});
