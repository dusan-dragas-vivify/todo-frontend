import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Splash from "./App/Screens/Splash";
import Dashboard from "./App/Screens/Dashboard";
import Login from "./App/Screens/Login";
import Edit from "./App/Screens/Edit";
import {dashboard} from "./App/Screens/Dashboard";
import {authService} from "./src/services/AuthService";

const RootStack = createStackNavigator(
    {
        Splash: {
            screen: Splash
        },
        Login: {
            screen: Login
        },
        Dashboard: {
            screen: Dashboard
        },
        Edit: {
            screen: Edit
        }
    },
    {
        initialRouteName: 'Splash',
    }
);

const App = () => {

    return (
        <RootStack/>
    );

};

export default App;
