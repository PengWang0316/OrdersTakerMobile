import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { BannerImage } from '../../app/components/BannerImage/BannerImage';

jest.mock('react-native', () => ({
  View: () => 'View',
  Image: () => 'Image',
  Dimensions: ({
    get: jest.fn().mockReturnValue({ width: 100, height: 200 }),
  }),
  StyleSheet: { create: jest.fn().mockReturnValue({ rootView: {} }) },
}));

describe('BannerImage', () => {
  const defaultProps = {
    basicInformation: { banners: [{ url: 'url' }] },
    fetchBasicInformation: jest.fn(),
  };
  const getShallowComponent = (props = defaultProps) => shallow(<BannerImage {...props} />);

  test('Constructor bisicInformation does not equal null', () => {
    const { Dimensions } = require('react-native');
    const component = getShallowComponent();
    expect(defaultProps.fetchBasicInformation).not.toHaveBeenCalled();
    expect(Dimensions.get).toHaveBeenCalledTimes(1);
    expect(Dimensions.get).toHaveBeenLastCalledWith('window');
    expect(component.instance().imageWidth).toBe(100);
    expect(component.instance().imageHeight).toBe(50);
  });

  test('Constructor bisicInformation equals null', () => {
    getShallowComponent({ ...defaultProps, basicInformation: null });
    expect(defaultProps.fetchBasicInformation).toHaveBeenCalledTimes(1);
  });

  test('Snapshot has basicInformation', () => expect(renderer.create(<BannerImage {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot does not have basicInformation', () => expect(renderer.create(<BannerImage {...{ ...defaultProps, basicInformation: null }} />).toJSON()).toMatchSnapshot());
});
