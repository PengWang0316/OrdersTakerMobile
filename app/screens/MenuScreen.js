import React from 'react';
import { View, StyleSheet } from 'react-native';

import SafeAreaScreen from './SafeAreaScreen';
import BannerImage from '../components/BannerImage';
import MenuCategory from '../components/MenuCategory';

const styles = StyleSheet.create({
  rootView: {
    width: '100%',
    height: '100%',
  },
  menuCategoryContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    width: '90%',
    paddingBottom: 200,
  },
});

/*
 * Menu Screen component
 */
export const MenuScreen = () => (
  <SafeAreaScreen>
    <View style={styles.rootView}>
      <BannerImage />
      <MenuCategory containerStyles={styles.menuCategoryContainer} />
    </View>
  </SafeAreaScreen>
);
export default MenuScreen;
