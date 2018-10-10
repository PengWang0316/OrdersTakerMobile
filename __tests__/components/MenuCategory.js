import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { MenuCategory } from '../../app/components/MenuCategory/MenuCategory';

jest.mock('../../app/components/MenuItem', () => 'MenuItem');

describe('MenuCategory', () => {
  const defaultProps = {
    fetchAllMenu: jest.fn(),
    containerStyles: {},
    numColumns: 2,
    menus: [{ category: 'category', items: [] }],
  };
  const getShallowComponent = (props = defaultProps) => shallow(<MenuCategory {...props} />);

  test('constructor has menus', () => {
    getShallowComponent();
    expect(defaultProps.fetchAllMenu).not.toHaveBeenCalled();
  });

  test('constructor does not have menus', () => {
    getShallowComponent({ ...defaultProps, menus: null });
    expect(defaultProps.fetchAllMenu).toHaveBeenCalledTimes(1);
  });

  test('_renderItem index 0', () => {
    const component = getShallowComponent();
    const section = {
      data: [
        'data0', 'data1', 'data3',
      ],
    };
    const returnComponent = component.instance()._renderItem({ index: 0, section });

    expect(returnComponent.key).toBe('0');
    expect(returnComponent.props.children.length).toBe(2);
  });

  test('_renderItem index 1', () => {
    const component = getShallowComponent();
    const section = {
      data: [
        'data0', 'data1', 'data3',
      ],
    };
    const returnComponent = component.instance()._renderItem({ index: 1, section });

    expect(returnComponent).toBeNull();
  });

  test('_renderItem index 2', () => {
    const component = getShallowComponent();
    const section = {
      data: [
        'data0', 'data1', 'data3',
      ],
    };
    const returnComponent = component.instance()._renderItem({ index: 2, section });

    expect(returnComponent.key).toBe('2');
    expect(returnComponent.props.children.length).toBe(1);
  });

  test('Snapshot with menus', () => expect(renderer.create(<MenuCategory {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot without menus', () => expect(renderer.create(<MenuCategory {...{ ...defaultProps, menus: null }} />).toJSON()).toMatchSnapshot());
});
