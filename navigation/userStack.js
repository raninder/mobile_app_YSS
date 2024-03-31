import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfile from '../screens/CreateProfile';
import TourScreen from '../screens/Tour';
import ProfileScreen from '../screens/ProfileScreen';
import BookScreen from '../screens/BookScreen';
import SimpleMenu from '../components/SimpleMenu';
import SearchScreen from '../screens/SearchScreen';
import EditProfile from '../screens/EditProfile'
import Header from '../components/Header';
import { StyleSheet, Text, View, Image, Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
 
      <Stack.Navigator initialRouteName="profile">

        <Stack.Screen name="createProfile" component={CreateProfile} />
        <Stack.Screen 
        name="EditProfile" 
        component={EditProfile}
       
         />
       
        <Stack.Screen name="Tour" component={TourScreen} />
        <Stack.Screen 
        name="profile" 
        component={ProfileScreen} 
        options={({navigation}) => ({
           headerLeft: () => (
            <Text></Text>
          ),
          headerRight:()=>(
            <Header />
           )
          })}
          />
        <Stack.Screen 
        name="search" 
        component={SearchScreen}
        options={({navigation}) => ({
          title: '',
          headerLeft: () => (
            <SimpleMenu
              menuText="Menu"
              textStyle={{color: 'white'}}
              navigation={navigation}
              isIcon={true}
            />
            
              ),
              headerRight:()=>(
                <View>
                <View style={{width:100, }}>
                    <Button title="Home" onPress={()=> navigation.navigate('profile')}></Button>
                   
                </View>
                {/* <Header /> */}
                </View>
               )
            })}
            
        />
        <Stack.Screen name="book" component={BookScreen} />
             
      </Stack.Navigator>
  
  );
}