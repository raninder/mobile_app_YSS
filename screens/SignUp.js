import React from 'react';
// import logo from "../../assets/logo.png"
// import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Image, Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

function SignUpScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{color:'green', fontSize:40, fontWeight:'bold'}}>Sign Up</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <TextInput
          placeholder='Email'
          style={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
          placeholder='Password'
          style={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          
        />

        {/* <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} /> */}
        <Pressable style={styles.signBtn} onPress={signUp} ><Text style={styles.textBtn} >Sign Up</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:100,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
    marginTop:30,
    alignItems: 'center',
  
  },

  control: {
    margin: 10,
    backgroundColor:'white',
    height: 50,
    width:300,
    borderRadius:10
  },
  signBtn: {
    margin: 20,
    backgroundColor:'#7A4F50',
    height: 50,
    width:100,
    padding:10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
    fontSize:16
  },
  textBtn:{
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});

export default SignUpScreen;