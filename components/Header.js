
import { StyleSheet,Text,TextInput, View, Button, TouchableOpacity} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import React, {useState, useEffect, useContext} from 'react'

export default function Header(){
  const {user, logout} = useContext(AuthContext);
return(
      <View style={styles.container}>
             <TouchableOpacity style={{marginLeft:300}} onPress={() => logout()}>
              <Text style={{color:'#7A4F50', textDecorationLine:'underline', fontWeight:'bolder'}}>Signout</Text>
            
            </TouchableOpacity>
       
        </View>
  
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight:20,
    paddingTop:10
   
    },
  })