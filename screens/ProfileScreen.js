import React from 'react';
import { Text, View, StyleSheet, Image,Modal, Button, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import {useState, useEffect, useContext} from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../navigation/AuthProvider';
import { onSnapshot, doc } from "@react-native-firebase/firestore"
import Tourscreen from './Tour';

export default function Profile({navigation}) {
  const [data, setData] = useState([])
  const {user, logout} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [active1, setactive1] = useState(false)
  const [active2, setactive2] = useState(false)

  const docRef1 = firestore().collection('users').doc(auth().currentUser.uid)
 
  useEffect(()=>{

    //get document from users collection in firebase
      onSnapshot(docRef1, (doc) => {
        setData(doc.data())
      })
     
      setIsLoading(false)
    },[])

    console.log(" user data", data)
  return (
    <ScrollView>
    <View style={styles.container}>
    <Modal            
          animationType = {"fade"}  
          transparent={true} 
          visible={active1} 
          onRequestClose={() => { 
            console.warn("closed")
            setactive1(false)
          }} >
          <TouchableOpacity
            style={{flex:1}}
            onPress={() => {
              setactive1(false)
          }}>  
        <View style={styles.modalView}> 
           <View>
              <Button title="Create Profile" color='#734A4B' onPress={()=> navigation.navigate('createProfile')}></Button>
            </View>
         
         </View>  
         </TouchableOpacity>       
      </Modal>
     
      <Tourscreen />
          <View style={styles.profileView}> 
                     
                  {data? (
                    <View style={{width:'80%'}}>
                      <View style={styles.headContainer}>
                      <TouchableOpacity
                          onPress={()=>{setactive1(!active1)}}
                          >
                        {data.userImg && <Image source={{uri:data.userImg}} style = {styles.pic} />}
                        </TouchableOpacity>

                        <Text style={styles.profileHead}>{data.firstName} {data.lastName}</Text> 
                      </View>

                      <View style={styles.dataContainer}>
                        <View style= {{flexDirection:'row', paddingBottom:20}}>
                          <Text style = {styles.dataKey}> Business Name:</Text><Text style = {styles.dataValue}> {data.businessName}</Text> 
                        </View>

                        <View style= {{flexDirection:'row', paddingBottom:20}}>
                          <Text style = {styles.dataKey}> Address: </Text><Text style = {styles.dataValue}> {data.address}</Text> 
                         </View>

                        <View style= {{flexDirection:'row', paddingBottom:20}}>
                          <Text style = {styles.dataKey}> Phone: </Text><Text style = {styles.dataValue}> {data.phone}</Text> 
                         </View>

                        <View style= {{flexDirection:'row', paddingBottom:20}}>
                          <Text style = {styles.dataKey}> Email: </Text><Text style = {styles.dataValue}> {data.email}</Text> 
                         </View>

                        <View style= {{flexDirection:'row', paddingBottom:20}}>
                          <Text style = {styles.dataKey}> Needs: </Text><Text style = {styles.dataValue}> {data.needs}</Text> 
                        </View>

                      </View>
                    </View>
                  ):
                  navigation.navigate('createProfile')}

                 <Button title="Edit Profile"  color="#734A4B" onPress={()=> navigation.navigate('EditProfile')}></Button>

             </View>

{/* added portal1  modal*/}

      <Modal            
          animationType = {"fade"}  
          transparent={true} 
          visible={active2} 
          onRequestClose={() => { 
            console.warn("closed"); 
          }} >
          <TouchableOpacity
            style={{flex:1}}
            onPress={() => { setactive2(false)}}
            > 
            
              <View style={styles.modalView1}> 
                 <View style={styles.buttons}>
                    <Pressable style={styles.portalBtn} onPress={()=> navigation.navigate('book')}>
                      <Text style={styles.txtBtn}>Book a Meeting</Text>
                    </Pressable>
                    <Pressable style={styles.portalBtn} onPress={()=> navigation.navigate('createProfile')}>
                      <Text style={styles.txtBtn}>Make a Payment</Text>
                    </Pressable>
                  </View>
                 </View> 
            </TouchableOpacity> 
        </Modal>

     <View style={{flexDirection:'row'}}> 
        <View style={styles.portal}>
            <TouchableOpacity  onPress={()=>{setactive2(!active2)}}>
              <Text style={{fontSize:12, color:'black'}}>Portal1 </Text>
            </TouchableOpacity>
        </View>
      
      
{/* Portal2 */}

      <View style={styles.portal}>
          <TouchableOpacity onPress={()=>{navigation.navigate('search')}}>
              <Text style={{fontSize:12, color:'black'}}>Portal2 </Text>
          </TouchableOpacity>
        </View>
       </View>
      </View>
  </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
   },
  profileView:{
    padding:20
  },
  headContainer:{
    flexDirection:'row',
    marginBottom:30,
  },
  profileHead:{
    margin:20,
    fontSize:20,
    fontWeight:'bold',
    alignSelf:'center'
  },
  pic:{
       width: 100,
      height: 100,
      borderRadius: 60,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "green"
    
  },
  dataContainer:{
    width:'100%'
    },
  dataKey:{
    color:'black',
    fontSize:22,
    fontWeight:'bold',
    lineHeight:20,
  },
  dataValue:{
    color:'black',
    fontSize:20,
    lineHeight:20
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
  button:{
    width:20,
    height:20,
    position:'absolute',
    top:3,
    right:0

},
modalView:{
  position:'absolute',
  top:230,
  left:120,
  margin: 10,
  backgroundColor: 'white',
 borderWidth:0.5,
 padding: 10,
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
modalView1:{
  margin: 10,
  position:'absolute',
  top:530,
  left:100,
  backgroundColor: '#31363F',
  borderWidth:0.5,
  padding: 10,
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
 },
portalBtn:{
  margin:10,
  height:50,
  width:95,
  backgroundColor:'#E5E8EE',
  padding:5,
  borderRadius:10,
  borderColor:'white',
  borderWidth:2
},
portal:{
  height:100, 
  width:100, 
  borderRadius:50,
  borderWidth:2,
  borderColor:'green',
  alignItems:'center',
  justifyContent:'center',
  margin:10,
},
})
