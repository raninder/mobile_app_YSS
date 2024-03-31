import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Check if the selected file is within the 5 MB limit
      const fileSize = await RNFS.stat(result.uri);
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (fileSize.size > maxSize) {
        Alert.alert('File Size Limit Exceeded', 'Please select a file up to 5 MB.');
      } else {
        setSelectedFile(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        throw err;
      }
    }
  };
  const uploadFile = () => {
    // Implement your file upload logic here
    if (selectedFile) {
      // You can use the selectedFile.uri to get the file path for upload
      Alert.alert('File Uploaded', `File ${selectedFile.name} has been uploaded successfully.`);
    } else {
      Alert.alert('No File Selected', 'Please select a file to upload.');
    }
  };
  return (
    <View>
      <Button title="Pick Document" onPress={pickDocument} />
      {selectedFile && <Text>Selected File: {selectedFile.name}</Text>}
      <Button title="Upload File" onPress={uploadFile} />
    </View>
  );
};
export default FileUpload;