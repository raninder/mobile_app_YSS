import React from 'react';
import { Text, View, StyleSheet, Modal, Button, TouchableOpacity, Pressable} from 'react-native';
import {useState} from 'react'

export default function Tourscreen({navigation}) {
  const [active , setactive] = useState(false);

  return (
    <View style={styles.container}>
        <Modal            
          animationType = {"fade"}  
          transparent={true} 
          visible={active} 
          onRequestClose={() => { 
            console.warn("closed"); 
          }} >
            <View style={styles.container}> 
              <View style={styles.modalView}> 
                <Text style={styles.modalText}>What is your computer/phone proficiency level?</Text> 
                <View style={styles.buttons}>
                    <Pressable style={styles.button} onPress={()=> navigation.navigate('createProfile')}>
                      <Text style={styles.txtBtn}>Beginner</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={()=> navigation.navigate('createProfile')}>
                      <Text style={styles.txtBtn}>Intermediate</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={()=> navigation.navigate('createProfile')}>
                      <Text style={styles.txtBtn}>Advanced</Text>
                    </Pressable>

                  </View>
                  <Button title="close" onPress={()=>{setactive(!active)}}/> 
                </View> 
              </View> 
        </Modal>
      
        <View style={styles.tour}>
        <TouchableOpacity onPress={()=>{setactive(!active)}}>
          <Text style={styles.textTour}>Tour </Text>
          </TouchableOpacity>
      </View>
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tour:{
    alignSelf:'flex-end',
    height:80,
    width:80,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
 
  },
  textTour: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:'center',
    color:'white'
  },
  modalView:{
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText:{
    fontSize:17,
    fontWeight:'bold'
  },
  buttons: {
    flexDirection: "row",
  },
  button:{
    margin:10,
    width:95,
    backgroundColor:'#7A4F50',
    padding:5
  },
  txtBtn:{
    color:'white',
    textAlign:'center',
    
  }
})