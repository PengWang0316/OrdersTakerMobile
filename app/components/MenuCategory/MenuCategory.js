import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SectionList, Text, View } from 'react-native';

import { fetchAllMenu } from '../../actions/MenuActions';
import MenuItem from '../MenuItem';
import Styles from './Styles';


type Props = {
  fetchAllMenu: Function,
  containerStyles?: Object,
  numColumns?: number,
  menus: Object,
};

/**
 * The Menu Category component that include all menu item.
 */
export class MenuCategory extends Component<Props> {
  static defaultProps = {
    containerStyles: {},
    numColumns: 2,
  };

  /**
   * Calling the fetchAllMenu to fetch and save menu information.
   * @param {object} props contains prop values.
   */
  constructor(props) {
    super(props);
    if (!props.menus) props.fetchAllMenu();
  }

  /**
   * Putting several item to a view based on the numColums props.
   * @param {object} all param will be supplied from SectionList renderItem method.
   * @return {View} Return a View component with flex: 1 and flexDirection: 'row'.
   */
  _renderItem = ({ index, section }) => {
    const { numColumns } = this.props;
    // % does not equal 0 means this item has already been added by the previous call.
    if (index % numColumns !== 0) return null;
    const itemsArr = [];
    for (let i = index; i < index + numColumns; i++) {
      if (i >= section.data.length) break; // i could over the max number when it reach the end.
      itemsArr.push(<MenuItem key={i} item={section.data[i]} />); // Push a MenuItem component to the array.
    }
    return <View key={index} style={Styles.itemView}>{itemsArr}</View>;
  };

  /**
   * The render method
   * @return {jsx} Return jsx for the component.
   */
  render() {
    const { containerStyles, menus } = this.props;
    return (
      <View style={containerStyles}>
        {menus && (
          <SectionList
            renderItem={params => this._renderItem(params)}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={Styles.sectionHeader}>{title}</Text>
            )}
            sections={menus.map(menu => ({ title: menu.category, data: menu.items }))}
            keyExtractor={(item, index) => item + index}
            // contentContainerStyle={{ flexWrap: 'wrap', flexGrow: 1, flexDirection: 'row' }}
          />
        )}
      </View>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  menus: state.menus,
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchAllMenu: () => dispatch(fetchAllMenu()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MenuCategory);
