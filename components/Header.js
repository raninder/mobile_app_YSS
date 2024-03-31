
import { StyleSheet,Text,TextInput, View, Button} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import React, {useState, useEffect, useContext} from 'react'

export default function Header(){
  const {user, logout} = useContext(AuthContext);
return(
      <View style={styles.container}>
             {/* <Text style={{ fontSize:10, color:'#7A4F50'}}>{user?.email}!</Text> */}
              <View style={{ width: 100, height: 38,marginLeft:250 }}> 
                <Button title="Sign Out" color="#7A4F50" onPress={() => logout()}/>
               </View>  
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