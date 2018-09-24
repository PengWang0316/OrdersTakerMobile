import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
// import { Button } from 'react-native';
import { Icon } from 'react-native-elements';

import MenuScreen from './screens/MenuScreen';
import OrdersScreen from './screens/OrdersScreen';
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
      <Icon type="font-awesome" name="user-circle" color="white" onPress={() => navigation.navigate('Login')} iconStyle={{ marginRight: 15 }} />
    )
  }
);

const MenuStack = createStackNavigator(
  {
    Menu: { screen: MenuScreen }
  },
  {
    navigationOptions: defaultOptions
  }
);

const MenuBundleStack = createStackNavigator(
  {
    Menu: { screen: MenuStack },
    Login: { screen: LoginScreen }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const RootStack = createBottomTabNavigator(
  {
    Menu: MenuBundleStack,
    Orders: OrdersScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Menu':
            iconName = <Icon type="entypo" name="open-book" color={tintColor} />;
            break;
          case 'Orders':
            iconName = <Icon type="entypo" name="list" color={tintColor} />;
            break;
          case 'Cart':
            iconName = <Icon type="entypo" name="shopping-cart" color={tintColor} />;
            break;
          default:
            break;
        }
        return iconName;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#6d9cb5'
    }
  }
);

export const App = () => <RootStack />;

export default App;
