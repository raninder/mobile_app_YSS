import React from 'react';
import { Animated, StyleSheet, Text, View, Image } from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
// import Tour from './components/Tour.js'
import { useEffect } from 'react';
// import LoginForm from './components/LoginForm.js';
// import HomeScreen from './components/HomeScreen.js';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './config/firebase.js';
import RootNavigation from './navigation/index.js';

const Stack = createNativeStackNavigator();
export default function App() {
    // useEffect(() => {
    //     SplashScreen.hide();
    //   }, [])
      return (
        <RootNavigation />
    //   <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Tour" component={Tour} />
    //   </Stack.Navigator>
    // </NavigationContainer>

        // <Tour />
        // <NomadicGlen1 />
     )
}

