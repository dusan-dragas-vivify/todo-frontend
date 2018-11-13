import React from 'react';
import { StyleSheet, Text, View, Button, NavigatorIOS} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Dashboard from "./App/Components/Dashboard";
import Login from "./App/Components/Login";

const RootStack = createStackNavigator(
    {
        Login: Login,
        Dashboard: Dashboard
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
