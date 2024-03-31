import React from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FacebookLoginButton = () => {
  const navigation = useNavigation();

  const handleFacebookLogin = async () => {
    try {
        // Once signed in, get the user AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        const userCredential = await auth().signInWithCredential(facebookCredential);
        console.log('User signed in with Facebook!', userCredential.user);
        navigation.navigate('Home');
    } catch (error) {
        console.log('Facebook login or Firebase credential failed:', error);
    }
  };

  return (
    <LoginButton
      onLoginFinished={handleFacebookLogin}
      onLogoutFinished={() => console.log("logout.")}/>
  );
};

export default FacebookLoginButton;