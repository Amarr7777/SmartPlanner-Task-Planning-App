import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '../screens/Login'
import Register from '../screens/Register'
import Pandora from '../screens/Pandora'
import TabNavigation from '../router/TabNavigation'
import { createStackNavigator } from '@react-navigation/stack';

const Navigation = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Pandora" component={Pandora} />
            <Stack.Screen name="Tab" component={TabNavigation} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Navigation;
