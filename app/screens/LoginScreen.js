import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

type Props = {
  navigation: Object
};

export const LoginScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to the Menu Screen!</Text>
    <Button onPress={() => navigation.goBack()} title="Go Back" />
  </View>
);
export default LoginScreen;
