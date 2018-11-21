import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Splash from "./App/Screens/Splash";
import Dashboard from "./App/Screens/Dashboard";
import Login from "./App/Screens/Login";
import Edit from "./App/Screens/Edit";
import { dashboard } from "./App/Screens/Dashboard";

const RootStack = createStackNavigator (
    {
        Splash: {
          screen: Splash
        },
        Login: {
            screen: Login,
            navigationOptions: () => ({
                title: 'Home'
            }),
        },
        Dashboard: {
            screen: Dashboard,
            navigationOptions: (props) => ({
                title: 'Dashboard',
                headerLeft: null,
                headerRight: <Button onPress={() => {dashboard.logout(props.navigation)}} title={'Logout'}></Button>
            }),
        },
        Edit: {
            screen: Edit,
            navigationOptions: () => ({
                title: 'Edit'
            }),

        }
    },
    {
        initialRouteName: 'Splash',
    }
);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: false
        };
    }

    render() {
    return (
      <RootStack/>
    );
  }
}
