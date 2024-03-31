import React from "react";
import { Pressable, StyleSheet, Text, View, Platform, Image, Alert, TouchableOpacity } from "react-native";
// title={`${item.name.first}  ${item.name.last}`} img = {item.picture.thumbnail}
const ListItem = (props) => {
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
          <Text style={style.title}>{`${props.item.name.first} ${
            props.item.name.last}`}</Text>
            <Text>{ `${props.item.email}`}</Text>
             
            </View>
          </View>
    )
}

export default ListItem;

const style = StyleSheet.create({
  listItem: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 300,
    padding: 10
  },
})