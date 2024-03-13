import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { useAuth } from '../hooks/useAuth';


export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {/* <View style={styles.}> */}
        <Text style={{color:'white', fontSize:20}}>Welcome {user?.email}!</Text>
    {/* </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor:'black',
    // backgroundColor: '#000000',
    alignItems: 'center',
    // justifyContent: 'center',
  },
})