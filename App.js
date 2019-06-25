/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import {MainTab} from "./src/MainTab";

const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: MainTab,
            navigationOptions: {
                header: null,
            },
        },
    }
);


const AppContainer=createAppContainer(AppNavigator);


export default class App extends Component {
    render() {
        return (
            <AppContainer/>
        );
    }
}


