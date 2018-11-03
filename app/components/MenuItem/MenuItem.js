import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import Styles from './Styles';

type Props = {
  item: Object,
};

export const MenuItem = ({ item }: Props) => (
  <View style={Styles.rootView}>
    <Avatar
      rounded
      size={140}
      source={{ uri: item.photo }}
    />
    <Text>{item.name}</Text>
  </View>
);
export default MenuItem;
