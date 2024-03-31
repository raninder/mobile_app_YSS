import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import filter from 'lodash.filter';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import GridItem from '../components/GridItem';
import ListItem from '../components/ListItem';
import ClusterItem from '../components/ClusterItem'

export default function SearchScreen({navigation}) {
  const {user, logout} = useContext(AuthContext);

  const[ input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [clicked, setClicked] = useState(false)
  const [termsArr, setTermsArr] = useState([]);
  const [mode, setMode] = useState('list')
  const [filteredData, setFilteredData] = useState([]);
  const [fullData, setFullData] = useState([]);
  

   const API_ENDPOINT = `https://randomuser.me/api/?seed=1&page=1&results=10`;
  useEffect(() => {
      fetchData(API_ENDPOINT);
  }, []);
    
  const fetchData = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(res => {
        setFullData(res.results);
        setFilteredData(res.results);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
 
    }
 

  const handleSearch = async() => {
    if(!input){
      setFilteredData(fullData)
      return
    }

    console.log("input", input)
     const formattedQuery = input.toLowerCase();
     const filtered = fullData.filter(user => {
      return contains(user, formattedQuery);
 
    });
    console.log("filtered", filtered[0].name.first)
    setFilteredData(filtered);
    setQuery(input);
    setTermsArr(prev=>[...prev,filtered[0].name.first])
    
    console.log("term", input)
   };

   //check if search term (name or email) contained in fetched data
  const contains = ({ name, email }, query) => {
    const { first, last } = name;
  
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }
  
    return false;
  };
 
  console.log("terms array",  (termsArr))
  useEffect(()=>{
     firestore().collection('users').doc(auth().currentUser.uid)
    .update({
      // storing array values in firestore field
       searchTerms:firestore.FieldValue.arrayUnion(...termsArr)
     
    })
  
},[termsArr])

  return (
    <View style={styles.container}>
      
      { isLoading &&
         (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        )
       }
       { error &&
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        )
      }
    <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>Contacts</Text>
        <Pressable onPress={()=> setMode('grid')}>
         <Text style={{textDecorationLine: 'underline', marginLeft:60, fontSize:16}}>Grid</Text>
        </Pressable>
        <Pressable onPress={()=> setMode('list')}>
         <Text style={{textDecorationLine: 'underline', marginLeft:10, fontSize:16}}>List</Text>
        </Pressable>
        <Pressable onPress={()=> setMode('cluster')}>
         <Text style={{textDecorationLine: 'underline', marginLeft:10, fontSize:16}}>Cluster</Text>
        </Pressable>
    </View>
    <View
        style={{
          backgroundColor: '#fff',
          marginVertical: 8,
          borderRadius: 20
        }}
      >
      <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={input}
          onChangeText={value => setInput(value)}
          placeholder="Search"
          onFocus={() => {
            setClicked(true);
          }}
          style={styles.searchBox}
        />
      <Button title="seacrh" onPress={handleSearch}></Button>
      {clicked && (
          <TouchableOpacity onPress={()=>{
            setInput("")
            handleSearch()
            }}style={{ position:'absolute',right:10,top:15,padding: 1 }} >
            <Icon name={'close'} color={'gray'} size={20} />
          </TouchableOpacity> 
        )}
      </View>
      {filteredData.length === 0?
         <Text>No users found</Text>
        : 
      
        mode==='list'?
          (<FlatList
            data={filteredData}
            key={'@'}
            keyExtractor={item => "@" + item.email}
            renderItem={({ item }) => (
              <ListItem item={item} />
              
            )}
          />)
          :
       (mode==='cluster'?
          (<FlatList
            data={filteredData}
            key={'_'}
            keyExtractor={item => "_" + item.email}
            numColumns={3}
            renderItem={({ item }) => (
              <ClusterItem item={item} />
            )}
          />):
        <FlatList
          data={filteredData}
          numColumns={2}
          key={'#'}
          keyExtractor={item => "#" + item.email}
          renderItem={({ index, item }) => (
            <GridItem item = {item} />
            
        )} />
       )
    
   } 
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding:10
  },
  text: {
    fontSize: 20,
    color: '#101010',
    fontWeight: '700'
  },
  
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  
  searchBox:{
    paddingHorizontal:20,
    paddingVertical:10,
    borderColor:'#CCC',
    borderWidth:1,
    borderRadius:8
  },
  
})