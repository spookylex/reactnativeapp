//Alexis Osipovs, ao3px
  /***************************************************************************************
  
  *  REFERENCES:
  *  Title: Full Modern React Tutorial 
  *  Tutorial videos referenced: #8 Using State (useState hook), #9 Intro to React Dev Tools, #10 Outputting Lists, #13 Functions as Props, #14 useEffect Hook
  *  URL: https://www.youtube.com/watch?v=tHjxSVaj_wY&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=10 

  * Title: useIsFocused Doc
  *  URL: https://reactnavigation.org/docs/use-is-focused/
  
  * Title: AsyncStorage Usage
  *  URL: https://react-native-async-storage.github.io/async-storage/docs/usage/
  
  * Title: React Native Tutorial #7 - Flat List Component
  *  URL: https://www.youtube.com/watch?v=iMCM1NceGJY
  
  * Title: Installed community checkbox -- @react-native-community/checkbox
  *  URL: https://github.com/react-native-checkbox/react-native-checkbox
  ***************************************************************************************/

import React, {useEffect, useState} from "react";
import {useIsFocused} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import {
  useColorScheme,
  View,
  Button,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";

const List = ({ navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const currentTitle = "UVA Bucket List App";  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const storageKey = '@bucketList';

  const [toggleCheckBox, setToggleCheckBox] = useState(false) //see references

  //Changed the storing of items to be objects rather than string values
  //See references
  const [items, setItems] = useState([
    {id: 1, name: "Graduate", des: "B.A. Computer Science", date: '5/21/2023', completed: false},
    {id: 2, name: "Visit Monticello", des: "Go in Spring", date: '3/15/2023',completed: false},
    {id: 3, name: "Go to Lighting of the Lawn", des: "At the Rotunda", date: '12/06/2022', completed: false}
  ] );

  //refreshes the homepage when new changes have been made in the stacknavigator
  const focused = useIsFocused(); //see references

  useEffect(() => {
    navigation.setOptions({ headerTitle: currentTitle });
    if(focused){ //see references
      getData();
    }
      
  }, [focused]);

   const getData = async () => {
    try {
        const value = await AsyncStorage.getItem(storageKey)
        if(value !== null) {
            setItems(JSON.parse(value));
        }
      } catch(e) {
        // error reading value
    }
  }

  const storeData = async () => { //call when you change screens
    try {
      await AsyncStorage.setItem(storageKey,  JSON.stringify(items))
    } catch (e) {
    }
  }

  const addItem =  () => {
      storeData()
      navigation.navigate('Add')
  }

  const editItem = (idnum) => {
    storeData()
    navigation.navigate('ItemInfo', {id:idnum}) //sending item details
}

  return (
      <View>
        <View style={ {marginLeft: 'auto', padding: 5 }}>
        <TouchableOpacity //see references
          style={{
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              width:40,
              height:40,
              backgroundColor:'#fff',
              borderRadius:50,
            }}
        >
          <Text onPress={addItem}>+</Text>
       </TouchableOpacity>
      </View>
      {/* see references */}
      <FlatList //automatically looks for the key property
      keyExtractor={(item) => item.id} //use id as the key property
      data ={items} //destructure the item
      
      renderItem={({item}) => (
       
        <TouchableOpacity onPress={() => editItem(item.id)}>
          <View style={styled.item}>
          <Text style={styled.title}>{item.name}</Text>
          <Text style={{color:"#373737"}}>{item.des}</Text>
          <Text style={{color:"#373737"}}>Due: {item.date}</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          </View>
          </TouchableOpacity>
      )}
      />
      </View>
     
  );
};

export default List;

const styled = StyleSheet.create({
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 30,
    backgroundColor: '#7BD1FF',
    fontSize: 24,
    borderRadius: 40,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2A2A2A',
    textDecorationLine: 'underline',
  }
  
});
