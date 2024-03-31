import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default function ModalComp() {
 

  return (
    <View style={styles.container}>
        <Text style={{ fontSize:20}}>Welcome !</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
   },
})