import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import styles from './Styles';
// import Theme from '../../Theme';

export const SocialLoginPanel = () => (
  <Fragment>
    <View>
      <Text style={styles.title}>Social Login</Text>
    </View>
    <View>
      {/* <Button
        buttonStyle={[styles.loginButton, styles.facebookBtn]}
        title="Sign in with Facebook"
        icon={(
          <Icon
            type="font-awesome"
            name="facebook"
            color={Theme.primary.contrastText}
          />
        )}
      /> */}
      <SocialIcon
        type="facebook"
        title="Sign in With FaceBook"
        button
      />
    </View>

    <View>
      {/* <Button
        buttonStyle={[styles.loginButton, styles.googleBtn]}
        title="Sign in with Google"
        icon={(
          <Icon
            type="entypo"
            name="google-"
            color={Theme.primary.contrastText}
          />
        )}
      /> */}
      <SocialIcon
        type="google-plus-official"
        title="Sign in With Google"
        button
      />
    </View>
  </Fragment>
);
export default SocialLoginPanel;
