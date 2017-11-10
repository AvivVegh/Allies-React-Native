import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import Settings from '../screens/Settings';
import UserDetail from '../screens/UserDetail';
import Me from '../screens/Me';
import SignIn from '../screens/SignIn';

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
      // Uncomment to syle your navgation
      // headerTitleStyle: {
      //   color : '#ffffff'
      // },
      // headerStyle: {
      //   backgroundColor: 'red',
      //   elevation: null
      // },
    },
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const SignInStack = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'SignIn',
    },
  },
});

export const Root = StackNavigator({

  SignIn: {
    screen: SignInStack,
  },
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

// This logic disable back to login page
const prevGetStateForAction = Root.router.getStateForAction;

Root.router.getStateForAction = (action, state) => {
  // Do not allow to go back from Main
   if (action.type === 'Navigation/BACK' && state
      && state.routes[state.index].routeName === 'Tabs'
      && state.routes[state.index].routes[0].routes != undefined
      && state.routes[state.index].routes[0].routes.length == 1) {
        return null;
   }

   // Do not allow to go back to SignIn
   if (action.type === 'Navigation/BACK' && state) {
     const newRoutes = state.routes.filter(r => r.routeName !== 'SignIn');
     const newIndex = newRoutes.length - 1;
     return prevGetStateForAction(action, { index: newIndex, routes: newRoutes });
   }
  return prevGetStateForAction(action, state);
};
