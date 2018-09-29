import React from 'react';
import renderer from 'react-test-renderer';

import { LoginPanel } from '../../app/components/LoginPanel/LoginPanel';

// jest.mock('Text', () => 'Text');
// jest.mock('View', () => 'View');
// jest.mock('../../app/components/LoginForm', () => 'LoginForm');
// jest.mock('../../app/components/SocialLoginPanel', () => 'SocialLoginPanel');

describe('LoginPanel', () => {
  const defaultProps = { handleSnackbarUpdate: jest.fn() };
  test('Snapshot', () => expect(renderer.create(<LoginPanel {...defaultProps} />).toJSON()).toMatchSnapshot());
});
