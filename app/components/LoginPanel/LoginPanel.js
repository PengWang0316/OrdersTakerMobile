import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-elements';

import LoginForm from '../LoginForm';
import SocialLoginPanel from '../SocialLoginPanel';
import styles from './Styles';

type Props = { handleSnackbarUpdate: Function, navigation: Object };

export const LoginPanel = ({ handleSnackbarUpdat, navigation }: Props) => (
  <View style={styles.internalContainer}>
    <SocialLoginPanel />

    <View style={styles.deviderView}>
      <Divider style={styles.devider} />
      <Text style={styles.title}>or</Text>
      <Divider style={styles.devider} />
    </View>

    <LoginForm handleSnackbarUpdat={handleSnackbarUpdat} navigation={navigation} />
  </View>
);
export default LoginPanel;
