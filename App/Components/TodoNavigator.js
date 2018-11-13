import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import { App } from '../../App';

export default class TodoNavigator extends React.Component {
    render() {
        return(
            <NavigatorIOS
                initialRoute={{
                    title: 'Todo Navigator',
                    component: App
                }}
            />
        );
    }
}