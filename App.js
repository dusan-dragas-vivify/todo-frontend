import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Dashboard from "./App/Components/Dashboard";
import Login from "./App/Components/Login";
import Edit from "./App/Components/Edit";

const RootStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                title: 'Home'
            }),
        },
        Dashboard: {
            screen: Dashboard,
            navigationOptions: () => ({
                title: 'Dashboard',
                headerLeft: null,
                headerRight: <Button onPress={Dashboard.logout} title={'Logout'}></Button>
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
        initialRouteName: 'Login',
    }
    );

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jwt_token: '',
            isLoading: false,
            error: false
        };
    }

    newJWT = (jwt) => {
        this.setState({
            jwt_token: jwt
        });
    };

    render() {
    return (
      <RootStack/>
    );
  }
}
