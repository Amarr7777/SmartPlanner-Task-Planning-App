import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/home';
import TaskScreen from './src/screens/task';
import Profile from './src/screens/profile';
import Calendar from './src/screens/calendar';
import AddTaskScreen from './src/screens/AddTaskScreen'; // Import AddTaskScreen
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faTasks, faUser, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, accessibilityLabel }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
