import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// Tab screens
import MenuScreen from './screens/MenuScreen';
import OrdersScreen from './screens/OrdersScreen';
import CartScreen from './screens/CartScreen';

// Modal screens
import LoginScreen from './screens/LoginScreen';
import UserInfoScreen from './screens/UserInfoScreen';

import NavbarUserAvatar from './components/NavbarUserAvatar';
import Theme from './Theme';

const defaultOptions = ({ navigation }) => (
  {
    headerStyle: {
      backgroundColor: Theme.primary.main,
    },
    headerTintColor: Theme.primary.contrastText,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitle: 'OrdersTaker',
    headerRight: <NavbarUserAvatar navigation={navigation} />,
  }
);

const MenuStack = createStackNavigator(
  {
    Menu: { screen: MenuScreen },
  },
  {
    navigationOptions: defaultOptions,
  },
);

const MenuBundleStack = createStackNavigator(
  {
    Menu: { screen: MenuStack },
    Login: { screen: LoginScreen },
    UserInfo: { screen: UserInfoScreen },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const RootStack = createBottomTabNavigator(
  {
    Menu: MenuBundleStack,
    Orders: OrdersScreen,
    Cart: CartScreen,
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
      },
    }),
    tabBarOptions: {
      activeTintColor: Theme.primary.dark,
    },
  },
);

export const App = () => <RootStack />;

export default App;
