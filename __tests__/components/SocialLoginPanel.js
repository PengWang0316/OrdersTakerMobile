import React from 'react';
import renderer from 'react-test-renderer';

import { SocialLoginPanel } from '../../app/components/SocialLoginPanel/SocialLoginPanel';

jest.mock('react-native-elements', () => ({
  SocialIcon: () => 'SocialIcon',
}));

describe('SocialLoginPanel Test', () => {
  test('Snapshot', () => expect(renderer.create(<SocialLoginPanel />).toJSON()).toMatchSnapshot());
});
