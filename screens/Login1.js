import React, { useState, useEffect } from 'react';
import { Alert, Button, TextInput, Text, View, StyleSheet } from 'react-native'
import { AsyncStorage} from '@react-native-async-storage/async-storage';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { getAuth} from "firebase/auth";
import { useAuth } from '../hooks/useAuth';
// import { useNavigate, useLocation } from 'react-router-dom';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';
// const auth = getAuth();
const Login1 = ({navigation}) =>{
  const { user } = useAuth();
  // const navigate = useNavigate();
  // const { search } = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  useEffect(() => {
    const authenticateUser = async () => {
      if (user) {
        navigation.navigate('Home');
        return;
      }
      const link= "https://testyss.page.link/welcome"
      if (isSignInWithEmailLink(auth, link)) {
        // let emailFromStorage = localStorage.getItem('email');
        const email= await AsyncStorage.getItem('email');
        // if (!emailFromStorage) {
        //   emailFromStorage = window.prompt('Please provide your email');
        // }
        setIsLoading(true);
        try {
          await signInWithEmailLink(auth, email, link);
          AsyncStorage.removeItem('email');
          navigation.navigate('home');
        } catch (error) {
          setErrorMessage(error.message);
          navigation.navigate('Login');
        } finally {
          setIsLoading(false);
        }
      }
    };
    authenticateUser();
  }, [user]);
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, userEmail, {
        // url: 'https://test-yss.firebaseapp.com',
        // url:'https://testyss.page.link/naxz',
        // test-yss.web.app
        url:'https://testyss.page.link/',
        handleCodeInApp: true,
        android: {
          packageName: 'testyss',
          installApp: true,
          minimumVersion: '12',
        },
      });
      AsyncStorage.setItem('email', userEmail);
      setInfoMessage('We have sent you an email with a link to sign in');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const LoginForm = () => (
    <View style={StyleSheet.container}>
      <Text>Form</Text>
    <TextInput value={userEmail} onChangeText={text => setUserEmail(text)} />
    <Button title="Send login link" onPress={handleLogin} />

    <Text>{errorMessage} </Text>
      <Text>{infoMessage}</Text>
   
  </View>
        
     
  );
  
  return (
    <LoginForm />
   
      // {user? (<Text>Please wait</Text>) : <LoginForm />}
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
   justifyContent: 'center',
   alignItems: 'center'
  },
})

export default Login1