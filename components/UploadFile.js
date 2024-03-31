import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import { useState, useEffect } from 'react';
import storage, {uploadBytesResumable, getDownloadURL} from '@react-native-firebase/storage';
// import { UploadFile } from './Core/fileUpload';
// import { LogBox } from 'react-native';
// import SuccessScreen from './src/components/successScreen';


// LogBox.ignoreLogs(['Setting a timer']);
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

export default function UploadFile() {

  //STATES
  const [blobFile, setBlobFile] = useState(null);
  const [fileName, setFileName] = useState('No Files')
  const [isChoosed, setIsChoosed] = useState(false)
  const [uploadCompleted, isUploadCompleted] = useState(false)
  const [uploadStart, setUploadStart] = useState(false);


  //HOOKS
  useEffect(() => {
    if (uploadCompleted) {
      showToastWithGravityAndOffset('Document Saved SuccessFully')
      // clearFiles();
    }
  }, [uploadCompleted])
  //FUNCTIONS

  const pickDocument = async () => {
   
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log("result", result)
      // const r = await fetch(result.uri);
      const blobFile = await uriToBlob(result.uri)
      // const b = await r.blob();
      setFileName(result.name)
      setBlobFile(blobFile)
      setIsChoosed(true)
    } 
  
  console.log("filename", fileName, isChoosed)
  // const clearFiles = () => {
  //   setFileName('No Files')
  //   setBlobFile(null)
  //   setIsChoosed(false)

  // }

  const uploadFile = () => {
    if (!blobFile) return;
    const sotrageRef = storage().ref(`myDocs/${fileName}`);
    const uploadTask = uploadBytesResumable(sotrageRef, blobFile);
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

  


  return (
    <View style={styles.container}>
      
          <Text style={styles.textStyle} >{fileName}</Text>
          <View style={styles.btnContainer}>

            {isChoosed ?
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
              <FontAwesome5 name="file-upload" size={60} color="black" />
            </TouchableOpacity>

          </View>
       


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center'
  }
});