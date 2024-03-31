import { Platform, StyleSheet,Text,TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import storage, {uploadBytesResumable, getDownloadURL} from '@react-native-firebase/storage';

import {
   SubmitBtn,
  SubmitBtnText,
 } from '../styles/AddPost';

import {
  GestureHandlerRootView,
  ScrollView // Note that this is not imported from react-native
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

const CreateProfile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [value, setValue] = useState({
    bname:"",
    fname:"",
    lname: "",
    email: "",
    address: "",
    needs:"",
    error: "",
  });
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
  const [errorMsg, setErrorMsg] = useState("");

  
   //store phone no. in 111-222-3333 format
  const phoneFormat = (phNumber) => {
    let match = phNumber.match(/(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      number = [match[1], '- ', match[2], '-', match[3]].join('');
      setPhone(number);
      return;
    }

    setPhone(phNumber);
  }
 
//create Profile, add information to firestore
  const saveData = async (e) => {
    e.preventDefault();
    if(!value.fname||!value.lname||!phone){
      setErrorMsg("Fill Name and Phone number");
      return;
    }
    setErrorMsg("");
    console.log('current User', auth().currentUser.uid);
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log("img",auth().currentUser.photoURL )
    firestore().collection('users').doc(auth().currentUser.uid)
      .set({
          businessName: value.bname||null,
          firstName: value.fname,
          lastName: value.lname,
          email: value.email||auth().currentUser.email,
          address: value.address||null,
          phone: phone,
          needs: value.needs|null,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          userImg: auth().currentUser.photoURL||imageUrl||null,
          
      })
      .then(() => {
        console.log('Data Added!');
        Alert.alert(
          'User Profile created Successfully!',
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
  

    // choose document to upload
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
         
  {/*  image uploaded from login or user can upload */}
  {user.photoURL?(
  <Image source={{uri:user.photoURL}} style = {styles.pic} />)
  :
        <View style={imageUploaderStyles.container}>
            {
              image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            }
           
                <View style={imageUploaderStyles.uploadBtnContainer}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary} style={imageUploaderStyles.uploadBtn} >
                        <Text style={{fontSize:10, fontWeight:'bold',alignSelf:'center'}}>{image ? 'Edit' : 'Upload'} Image</Text>
                        
                        
                    </TouchableOpacity>
                </View>
          </View>
     }   
     <View style={{marginTop:20}}>
        
      <View style={{flexDirection:'column'}}>
         <TextInput
          placeholder='BusinessName'
          style={styles.input}
          value={value.bname}
          onChangeText={(text) => setValue({ ...value, bname: text })}
        />
        <TextInput
          placeholder='Address'
          style={styles.input}
          value={value.address}
          onChangeText={(text) => setValue({ ...value, address: text })}
        />
          <View style={{flexDirection:'row'}}>
            <TextInput
              placeholder='First Name'
              style={styles.inputSmall}
              value={value.fname}
              onChangeText={(text) => setValue({ ...value, fname: text })}
            />
            <TextInput
              placeholder='Last Name'
              style={styles.inputSmall}
              value={value.lname}
              onChangeText={(text) => setValue({ ...value, lname: text })}
            />
         </View>
          <View style={{flexDirection:'row'}}>
            <TextInput
              placeholder='Email'
              style={styles.inputSmall}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
            <TextInput
              placeholder='Phone'
              style={styles.inputSmall}
              value={value.phone}
              onChangeText={phNumber => phoneFormat(phNumber) }
            />
         </View>
        
            <View>
                <TextInput
                  placeholder='Needs/Provisions'
                  style={styles.input}
                  value={value.needs}
                  onChangeText={(text) => setValue({ ...value, needs: text })}
                />
               
            </View>
      
      </View> 
    
      <Text style={styles.textStyle} >{fileName}</Text>
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
       </View>     

        <Text style={{color:'red'}}> {errorMsg}</Text>
        <SubmitBtn onPress={saveData}>
          <SubmitBtnText>Create Profile</SubmitBtnText>
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
      marginTop:10,
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
      height: 40,
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
  
})
export default CreateProfile