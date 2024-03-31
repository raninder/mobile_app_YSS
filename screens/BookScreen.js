import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,  ScrollView, Button, Pressable, Alert } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { ListItem } from 'react-native-elements';
import { Content } from 'native-base';

const BookScreen = ({navigation}) => {
  const [selectedDate,selectedStartDate] = useState(null)
  const [timeSlots, setTimeSlots] = useState([])
  const [selectTime, setSelectTime] = useState() 
  const [disable, setDisable] = useState(false)
  const [bookArr, setBookArr] = useState([])


  const handleDateChange = (date)=>{
      selectedStartDate(date)
  }
  console.log(selectedDate);
  const createTimeSlot = (fromTime, toTime) =>{
    let startTime = moment(fromTime,'hh:mm A')
    let endTime = moment(toTime,'hh:mm A')
    if(endTime.isBefore(startTime)){
      endTime.add(1,'day')
    }
    let arr = [];
    while(startTime<=endTime){
      arr.push(new moment(startTime).format('hh:mm A'))
      startTime.add(60, 'minutes')
     }
    return arr;
  }
  useEffect(()=>{
    setTimeSlots(createTimeSlot('10:00 AM', '1:00 PM'));
  
  },[])
  const handleBook = (item) => {
    setSelectTime(item)
    setDisable(true)
     // setBookArr([...bookArr, {user:'test1',slot:item}])
  }
  
   

  const handleConfirm = ()=>{
    
    Alert.alert(
      'Alert Title',
      `confirm? slot:${selectTime} and Day:${selectedDate}`,
      [
        {text: 'NO', onPress: () =>{ console.warn('NO Pressed');setDisable(false)}, style: 'cancel'},
        {text: 'YES', onPress: () => {
          console.warn('YES Pressed')
          setBookArr([...bookArr, {user:'test1',slot:selectTime, day: selectedDate}])
          // navigation.navigate('profile')
        }
        },
      ]
    );

  }
  console.log("booked array", bookArr)
return(
  <ScrollView>
  <View style={styles.container}>
        <CalendarPicker onDateChange= {handleDateChange}/>
    <View>
        <Text>Date: {selectedDate? moment(selectedDate).format("MMM Do YYYY") : ''}</Text>
          {selectTime && <Text>{selectTime}</Text>}
            { timeSlots.map((item,index)=>(
              <ListItem key={index}> 
                
                {timeSlots[index+1]&&(
                <Button
                  disabled={disable}
                  title={(timeSlots[index]+' - ' +timeSlots[index+1])}
                  onPress = {()=> handleBook(item)}
              
                     >
                </Button>)}
            </ListItem>
            )
            )}
         </View>
         <Pressable style={styles.btn} onPress={handleConfirm} ><Text style={styles.textUpload} >Confirm</Text></Pressable>
      </View>
      </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor:'green',
    height: 40,
    width:'22%',
    padding:5
  },
});
export default BookScreen;











