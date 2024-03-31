import { Animated, Platform, StyleSheet,Text,TextInput, View, Image, ScroolView,Button,Pressable,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import storage, {uploadBytesResumable, getDownloadURL} from '@react-native-firebase/storage';
import { onSnapshot, doc } from "@react-native-firebase/firestore"
import {
  SubmitBtn,
  SubmitBtnText,
 } from '../styles/AddPost';

import {
  GestureHandlerRootView,
  ScrollView 
} from 'react-native-gesture-handler';

//helper function for  converting file to blob
export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
     const xhr = new XMLHttpRequest()
     xhr.onload = function () {
       // return the blob
       resolve(xhr.response)
     }
     xhr.onerror = function () {
       reject(new Error('uriToBlob failed'))
     }
     xhr.responseType = 'blob'
     xhr.open('GET', uri, true)
 
     xhr.send(null)})
    }

const EditProfile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [phone, setPhone] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [blobFile, setBlobFile] = useState(null);
  const [file, setFile] = useState('No Files')
  const [fileName, setFileName] = useState('No Files')
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [uploadCompleted, isUploadCompleted] = useState(false)
  const [uploadStart, setUploadStart] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState([]);
 
  const phoneFormat = (phNumber) => {
    var match = phNumber.match(/(\d{3})(\d{3})(\d{4})$/)

    if (match) {
        number = [match[1], '- ', match[2], '-', match[3]].join('');
         setPhone(number);
        return;
    }

    setPhone(phNumber);
  }
 
  useEffect(() => {
    getUser();
  }, []);

  const docRef1 = firestore().collection('users').doc(auth().currentUser.uid)
    const getUser = () => {
    
      onSnapshot(docRef1, (doc) => {
        setUserData(doc.data())
      })
      
    }
    console.log("userData2", userData)

    const handleUpdate = async() => {
      const imgUrl = await uploadImage();
      if( imgUrl == null && userData.userImg) {
        imgUrl = userData.userImg;
      }
    firestore().collection('users').doc(auth().currentUser.uid)
      .update({
          businessName: userData.businessName,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          address: userData.address,
          phone: userData.phone,
          needs: userData.needs,
          userImg: imgUrl
          
      })
      .then(() => {
        console.log('Data Added!');
        Alert.alert(
          'User Profile updated Successfully!',
        );
        navigation.navigate('profile')
  
      })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
  
  }

   //chosing photo from device
   const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  // uploading image to cloud

  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };
  

    // chose document to upload
  const pickDocument = async () => {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });
    console.log("result", result)
    const blobFile = await uriToBlob(result.uri)
    setFileName(result.name)
    setBlobFile(blobFile)
    setIsFileSelected(true)
  } 

    console.log("filename", fileName, isFileSelected)
    console.log("phone", phone)

//upload file to cloud storage

const uploadFile = () => {
  if (!blobFile) return;
  const sotrageRef = storage().ref(`myDocs/${fileName}`);
  const uploadTask = uploadBytesResumable(sotrageRef, blobFile);
  if(uploadTask){
    Alert.alert("file uploaded")
  }
  uploadTask.on(
    "state_changed", null ,
    (error) => console.log(error),
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            isUploadCompleted(true)
            return downloadURL
        });

    })
}



  return(
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView >
      <View style={styles.container}>
          <View style={imageUploaderStyles.container}>
      
            {
              userData.userImg && <Image source={{uri:userData.userImg }} style={styles.pic} />
            }
     
                <View style={imageUploaderStyles.uploadBtnContainer}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary} style={imageUploaderStyles.uploadBtn} >
                        <Text style={{fontSize:10, fontWeight:'bold',alignSelf:'center'}}>{userData.userImg? 'Edit':'upload'}</Text>
                    
                    </TouchableOpacity>
                </View>
            </View>

     <View style={{marginTop:20}}>
        
      <View style={{flexDirection:'column'}}>
         <TextInput
          placeholder='BusinessName'
          style={styles.input}
          value={userData ? userData.businessName : ''}
          onChangeText={(txt) => setUserData({...userData, businessName: txt})}
        />
        <TextInput
          placeholder='Address'
          style={styles.input}
          value={userData ? userData.address : ''}
          onChangeText={(txt) => setUserData({...userData, address: txt})}
        />
          <View style={{flexDirection:'row'}}>
            <TextInput
              placeholder='First Name'
              style={styles.inputSmall}
              value={userData ? userData.firstName : ''}
              onChangeText={(txt) => setUserData({...userData, firstName: txt})}
             
            />
            <TextInput
              placeholder='Last Name'
              style={styles.inputSmall}
              value={userData ? userData.lastName : ''}
              onChangeText={(txt) => setUserData({...userData, lastName: txt})}
            />
         </View>
          <View style={{flexDirection:'row'}}>
            <TextInput
              placeholder='Email'
              style={styles.inputSmall}
              value={userData ? userData.email : ''}
              onChangeText={(txt) => setUserData({...userData, lastName: txt})}
            />
            <TextInput
              placeholder='Phone'
              style={styles.inputSmall}
              value={userData ? userData.phone : ''}
              onChangeText={(phNumber) => setUserData({...userData, phone:phoneFormat(phNumber)})}
             
            />
            <TextInput
              placeholder='Needs'
              style={styles.inputSmall}
              value={userData ? userData.needs : ''}
              onChangeText={(txt) => setUserData({...userData, needs:txt})}
             
            />
         </View>
        
              
      </View> 
      {/* <UploadFile /> */}
      {/* <Text style={styles.textStyle} >{fileName}</Text>
      <View style={styles.btnContainer}>
      {isFileSelected ?
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => uploadFile()}>
                <Text style={styles.btnTextStyle}>Upload</Text>
              </TouchableOpacity>

              :
              <Text style={styles.textStyle}>Choose a File -- </Text>
            }
          
            <TouchableOpacity
              onPress={() => pickDocument()}>
              <FontAwesome5 name="file-upload" size={40} color="grey" />
            </TouchableOpacity>
       </View>      */}

        
   
     
        <SubmitBtn onPress={handleUpdate}>
          <SubmitBtnText>Update Profile</SubmitBtnText>
        </SubmitBtn>
     
      </View>
      
  </View>
   </ScrollView>
   </GestureHandlerRootView>
)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight:20,
    paddingTop:10
   
    },
    header:{
      marginBottom:10,
      justifyContent:'space-between',
      flexDirection:'row'
     },
    title: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: 'bold',
      marginTop: 16
    },
    pic:{
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "green"
      
    },
    input:{
      paddingVertical: 8,
      marginBottom: 32,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      width: '100%',
      fontSize: 18,
      lineHeight: 24,
      height: 40
    },
    inputSmall:{
      paddingVertical: 8,
      marginBottom: 32,
      marginRight:10,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      width: '49%',
      fontSize: 18,
      lineHeight: 24,
      height: 40
    },
    btn: {
      backgroundColor:'lightgrey',
      height: 50,
      width:'45%',
      padding:5
    },
    uploadBtn:{
      backgroundColor:'#86BE3E',
      height: 30,
      width:'40%',
      padding:5,
      borderRadius:5
    },
    btnPick: {
      backgroundColor: 'transparent',
      height: 50,
      width:'40%',
      padding:10
    },
    saveBtn: {
      marginTop:20,
      alignSelf:'center',
      backgroundColor:'#AB7078',
      height: 50,
      width:300,
      padding:10,
      borderRadius:10
  
    },
    textBtn:{
      textAlign:'center',
      fontSize:17
    },
    textUpload:{
      color:'black',
      fontSize: 18,
      textAlign:'center'
    },
    textCreate:{
      color:'white',
      fontSize: 20,
      textAlign:'center'
    },
    textPick:{
      color:'black',
      fontSize: 15,
      borderWidth:1,
      padding:2,
      textAlign:'center'
    },
    portal:{
      height:60, 
      width:60, 
      borderRadius:30,
      borderWidth:2,
      borderColor:'green',
      alignItems:'center',
      justifyContent:'center',
      margin:20
    },
    textStyle: {
      padding: 10,
      fontSize: 18
  
    },
    btnStyle: {
      height: 50,
      width: 150,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnTextStyle: {
      color: 'white',
      fontSize: 20
    },
    btnContainer: {
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:30
    }
})

const imageUploaderStyles=StyleSheet.create({
  container:{
      elevation:2,
      height:100,
      width:100,
      backgroundColor:'#efefef',
      position:'relative',
      borderRadius:999,
      overflow:'hidden',
      borderWidth: 2,
      borderColor: "green"
  },
  uploadBtnContainer:{
      opacity:0.7,
      position:'absolute',
      right:0,
      bottom:25,
      backgroundColor:'lightgrey',
      width:'100%',
      height:'25%',
  },
  
  // uploadBtn:{
  //     // display:'flex',
  //     // alignItems:"center",
  //     // justifyContent:'center',
  //     borderWidth:2,
  //     borderColor:'green'
  // }
})
export default EditProfile