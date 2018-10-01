import React from 'react';
import renderer from 'react-test-renderer';

import RegisterPanel from '../../app/components/RegisterPanel/RegisterPanel';

describe('RegisterPanel', () => {
  test('Snapshot', () => expect(renderer.create(<RegisterPanel />).toJSON()).toMatchSnapshot());
});
