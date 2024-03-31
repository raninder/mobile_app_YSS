import React from "react";
import { Pressable, StyleSheet, Text, View, Platform, Image, Alert, TouchableOpacity } from "react-native";
// title={`${item.name.first}  ${item.name.last}`} img = {item.picture.thumbnail}
const ClusterItem = (props) => {
  console.log("props", props.item.name.first)
  // const {item } = props.item;
  const showUser = () => {
    Alert.alert(
      "User",
      `
      Name: ${props.item.name.first} ${props.item.name.last}
      Email:  ${props.item.email}
      Address: ${props.item.location.city} ${props.item.location.state}${props.item.location.country}
      Phone: ${props.item.cell}
      `
    )
  }
    return (
      <View style={style.listItem}>
        <TouchableOpacity onPress={showUser}>
          <Image style={style.coverImage} source={{uri: props.item.picture.thumbnail}} />
          </TouchableOpacity>
        
        <View style={style.metaInfo}>
          <Text style={style.title}>{`${props.item.name.first}` }</Text>
           <Text style={style.title}>{`${props.item.name.last}`}</Text>
            {/* <Text>{ `${props.item.email}`}</Text> */}
             
            </View>
          </View>
    )
}

export default ClusterItem;

const style = StyleSheet.create({
  listItem: {
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: '#fff',
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderWidth:2,
    borderColor:'green',
    flexDirection: 'column'
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignSelf: 'center'
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 11,
    width: 100,
    
  },
})