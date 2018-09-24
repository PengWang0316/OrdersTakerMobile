import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Button } from 'react-native';

import MenuScreen from './screens/MenuScreen';
import OrderScreen from './screens/OrderScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const defaultOptions = ({ navigation }) => (
  {
    headerStyle: {
      backgroundColor: '#6d9cb5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitle: 'OrdersTaker',
    headerRight: (
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Login"
        color="#CCC"
      />
    )
  }
);

const MenuStack = createStackNavigator(
  {
    Menu: MenuScreen,
    Login: LoginScreen
  },
  {
    navigationOptions: defaultOptions
  }
);

const RootStack = createBottomTabNavigator(
  {
    Menu: MenuStack,
    Order: OrderScreen,
    Cart: CartScreen
  },
  {
    initialRouterName: 'Menu',
    // navigationOptions: ({ navigation }) => (
    //   {
    //     headerStyle: {
    //       backgroundColor: '#6d9cb5',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },
    //     headerTitle: 'OrdersTaker',
    //     headerRight: (
    //       <Button
    //         onPress={() => navigation.navigate('LoginModal')}
    //         title="Login"
    //         color="#CCC"
    //       />
    //     )
    //   }
    // )
  }
);

export const App = () => <RootStack />;

export default App;
