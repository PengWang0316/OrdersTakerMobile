import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './Styles';

/**
 * The Register panel component
 */
export class RegisterPanel extends Component {
  state = {};

  /**
   * THe render method
   * @return {jsx} Return jsx for the component.
   */
  render() {
    return (
      <View style={styles.internalContainer}>
        <Text>Register Panel</Text>
      </View>
    );
  }
}
export default RegisterPanel;
