import React from "react";
import { Pressable, StyleSheet, Text, View, Platform, Image, Alert, TouchableOpacity } from "react-native";
// title={`${item.name.first}  ${item.name.last}`} img = {item.picture.thumbnail}
const GridItem = (props) => {
  console.log("props", props.item.name.first)
  const {item } = props.item;
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
    <View style={style.gridItem }>
    <Pressable
    style={style.button}
    android_ripple={{ color: '#ccc' }}
    >
    <View style={[style.innerContainer]}>
    <TouchableOpacity onPress={showUser}>
        <Image style={style.coverImage} source={{uri: props.item.picture.thumbnail}} />
      </TouchableOpacity>
    <Text style={style.textStyling}>{props.item.name.first} {props.item.name.last}</Text>
    </View>
    </Pressable>
    </View>
    )
}

export default GridItem;

const style = StyleSheet.create({
    textStyling: {
            fontSize: 16,
            fontStyle: 'italic',
            color: 'black'
    },
    innerContainer: {
            flex: 1,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center'

    },
    button: {
            flex: 1
    },
    gridItem: {
        flex: 1,
        margin: 5,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 4,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    coverImage: {
      width: 60,
      height: 60,
      borderRadius: 8
    },
})