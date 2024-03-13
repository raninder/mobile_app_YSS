import React from 'react';
import { Text, Pressable,Image, View, StyleSheet, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../assets/logo.png'


function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#090a29', '#000000']} style={{flex:1, width:'100%',borderRadius: 20}}>
      <Image source={logo} style= {{height:300, width:300, alignSelf:'center'}}/>
      <Text>Welcome screen!</Text>

      <View style={styles.buttons}>
        {/* <TouchanbleOpacity title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
        <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} /> */}
      
      <Pressable style={styles.signBtn} ><Text style={styles.textBtn} onPress={() => navigation.navigate('Sign In')}>Sign In</Text></Pressable>
      <Pressable style={styles.signBtn} ><Text style={styles.textBtn} onPress={() => navigation.navigate('Sign Up')}>Sign Up</Text></Pressable>
      </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor:'black',
    // backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flex: 1,
  },

  button: {
    marginTop: 10
  },
  signBtn:{
    backgroundColor: '#7A4F50',
    borderRadius:10,
    width:300,
    height:50,
    margin:20,
    alignSelf: 'center',
    padding:10
  },
  textBtn:{
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  }

});

export default WelcomeScreen;