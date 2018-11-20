import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Dashboard from "./App/Screens/Dashboard";
import Login from "./App/Screens/Login";
import Edit from "./App/Screens/Edit";

const RootStack = createStackNavigator (
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                title: 'Home'
            }),
        },
        Dashboard: {
            screen: Dashboard
        },
        Edit: {
            screen: Edit,
            navigationOptions: () => ({
                title: 'Edit'
            }),

        }
    },
    {
        initialRouteName: 'Login',
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
