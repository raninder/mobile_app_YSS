import React from 'react';
import { Text, View, StyleSheet, Modal, Button, TouchableOpacity, Pressable} from 'react-native';
import {useState} from 'react'
// import ModalComp from '../components/Modal';


export default function Portal1({navigation}) {
  const [active , setactive] = useState(false);
  const docRef1 = firestore().collection('users').doc(auth().currentUser.uid)
 
  useEffect(()=>{

    //get single document from higlights collection in firebase
      onSnapshot(docRef1, (doc) => {
        setData(doc.data())
      })
     
      setIsLoading(false)
    },[])


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
                <Text style={styles.modalText}>{data.fname} {data.lname}</Text> 
                
                  {data && (
                    <View>
                      <Text> Business Name: {data.businessName}</Text> 
                      <Text> Name: {data.firstName} {data.lastName}</Text> 
                      <Text> Address: {data.address}</Text> 
                      <Text> Phone: {data.phone}</Text> 
                      <Text> Email: {data.email}</Text> 
                      <Text> Needs: {data.needs}</Text> 
                    </View>
                  )}

                  <Pressable style={styles.portalBtn} onPress={()=> navigation.navigate('createProfile')}>
                    <Text style={styles.txtBtn}>Edit Profile</Text>
                  </Pressable>

             
                  <Pressable style={styles.closeBtn} onPress={()=>{setactive(!active)}}>
                      <Text style={{color:'white'}}>Close</Text>
                    </Pressable>
                  {/* <Button title="close" onPress={()=>{setactive(!active)}}/>  */}
                </View> 
              </View> 
        </Modal>
      
        <View style={styles.portal}>
        <TouchableOpacity
            // style={styles.chatBtn}
            onPress={()=>{setactive(!active)}}
          >
          <Text style={{fontSize:12, color:'black'}}>Porta1 </Text>
          </TouchableOpacity>
      </View>
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 60,
    // backgroundColor:'black',
    // backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tour:{
    height:150,
    width:150,
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
    // position:'absolute',
    // top:300,
    // left:20,
    // borderRadius:10,
    // backgroundColor:'lightbrown',
    // padding:10,
    // paddingTop:20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    margin: 10,
    backgroundColor: '#31363F',
    // backgroundColor: '#ecf0f1',
    borderRadius: 30,
    // borderColor:'black',
    borderWidth:0.5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalText:{
    fontSize:17,
    fontWeight:'bold'
  },
  buttons: {
    flexDirection: "row",
    // justifyContent: "center",
    
  },
  portalBtn:{
    margin:10,
    height:50,
    width:95,
    backgroundColor:'#E5E8EE',
    // backgroundColor:'#31363F',
    padding:5,
    borderRadius:10,
     borderColor:'white',
     borderWidth:2
  },
  txtBtn:{
    color:'black',
    textAlign:'center',
    // paddingTop:5
  },
  portal:{
    height:60, 
    width:60, 
    borderRadius:30,
    borderWidth:2,
    borderColor:'green',
    alignItems:'center',
    justifyContent:'center',
    margin:20,
    // transform: [{scale: 1.2}]

  },
  
})
