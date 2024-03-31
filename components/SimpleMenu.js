import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,

 } from "react-native-popup-menu";
 import { StyleSheet, Text, View, Image } from "react-native";
 import Icon from 'react-native-vector-icons/MaterialIcons'
 import React, {useState, useEffect, useContext} from 'react'
 import  AsyncStorage from '@react-native-async-storage/async-storage';
 import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../navigation/AuthProvider';
//  import { Entypo } from "@expo/vector-icons";
 
 const SimpleMenu = ({isIcon, menuText, textStyle, route, navigation}) => {
  const [items,setItems] = useState([])
  const {user, logout} = useContext(AuthContext);
  // useEffect(() => {
  //   retrieveData();
  // }, []);
  // const retrieveData = async() => {
  //   try {
  //         const itemArray = await AsyncStorage.getItem('keyterms');
  //         if (itemArray !== null) {
  //           // We have data!!
  //           console.log("menu array",JSON.parse(itemArray));
  //           setItems(JSON.parse(itemArray))
  //         }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log("menu async getitem error")
  //   }
  // }
  const [retrieve, setRetrieve] = useState(true);
  const [data, setData] = useState([]);

  const docRef1 = firestore().collection('users').doc(auth().currentUser.uid)
  // useEffect(() => {
    const retrieveData = async () => {
      console.log("hi")
      docRef1.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().searchTerms);
            setData(doc.data().searchTerms)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      })
      // onSnapshot(docRef1, (doc) => {
      //   setData(doc.data())
      // })
      // try {
      //   const valueString = await AsyncStorage.getItem('keyterms');
      //   const value = JSON.parse(valueString);
      //   console.log("value getitem", value)
      //   // Other set states
      //   setData(value);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    // Retrieve if has new data
    // if (retrieve){
      // retrieveData();
      // setRetrieve(false);
    // }
  // }, []);

  console.log("menu items", data)
  // setAsyncData()
  // getAsyncData1()
  return (
    <MenuProvider style={styles.container}>
      <Menu>
        <MenuTrigger
        onPress={ retrieveData}
          customStyles={{
            triggerWrapper: {
              top: -5,
        
            },
          }}
        >
          <Icon
            name='more-vert'
            size={30}
            color={'grey'}
            ref={this.onRef}
             />
        </MenuTrigger>
        <MenuOptions>
          {data&& data.map ((item,i)=>(
          <MenuOption onSelect={() => alert(`Save`)} text={item} key={i} />
          // <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
          ))
          }
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
 };
 
 export default SimpleMenu;

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'20%',
    backgroundColor: "#fff",
    padding: 30,
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor:'black'
  },
 });