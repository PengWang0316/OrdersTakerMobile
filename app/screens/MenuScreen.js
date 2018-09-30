import React from 'react';
import { StyleSheet, Text } from 'react-native';

import SafeAreaScreen from './SafeAreaScreen';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    margin: 10,
  },
});

export const MenuScreen = () => (
  <SafeAreaScreen>
    <Text style={styles.welcome}>Welcome to the Menu Screen!</Text>
  </SafeAreaScreen>
);
export default MenuScreen;
