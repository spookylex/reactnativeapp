//Alexis Osipovs, ao3px
  /***************************************************************************************
  
  *  REFERENCES:
  *  Title: Full Modern React Tutorial 
  *  Tutorial videos referenced: #8 Using State (useState hook), #9 Intro to React Dev Tools, #10 Outputting Lists, #13 Functions as Props, #14 useEffect Hook
  *  URL: https://www.youtube.com/watch?v=tHjxSVaj_wY&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=10 

  * Title: AsyncStorage Guides:
  *  URL: https://www.mindbowser.com/asyncstorage-in-react-native/ 
  *  URL: https://reactnative.dev/docs/asyncstorage
  *  URL: https://blog.logrocket.com/guide-react-natives-asyncstorage/
  
  ***************************************************************************************/
import React, {useEffect, useState} from "react";
import { View, Text, TextInput, Button, Alert , DatePicker, ScrollView} from 'react-native'
import styles from "../styles/styles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';


const Add = ({ navigation, route }) => {
    const currentTitle = "Add Item";  
    const [add, setAdd] = useState('');
    //whenever adding, you have to call using the hook
    const [newID, setID] = useState('');
    const [newName, setName] = useState('');
    const [newDes, setDes] = useState('');
    const [newDate, setDate] = useState(new Date());

    const storageKey = '@bucketList';


   
    // useEffect is a React Hook and is called when the screen is mounted
    // It allows us to use dynamic information in key component locations
    const storeData = async (value) => { //createbucketitem, savebucketitem
        //console.log('hello????')
       
        try {
            const item = {id: Date.now(), name: newName, des: newDes, date: newDate}
            // console.log('1????')
            const listOfItems = await AsyncStorage.getItem(storageKey) 
            // console.log('2????')
            // console.log(listOfItems)
            //pull, stringify, add it, setit
            // if(listOfItems != null){
            const fulllist = JSON.parse(listOfItems)
            // console.log('3????')
            const newList = [...fulllist, item] 
            // console.log('4????')
            await AsyncStorage.setItem(storageKey, JSON.stringify(newList))
            // console.log('5????')
            // }

            //condition for if empty, just add new item to list 
            navigation.navigate('List')
        } catch (e) {
            // saving error
        }
    }
    const clearText = () => {
        setName('');
        setDes('');
        setDate('');

    }

   
    return (
       


            <View style={{padding: 10}}>
                <ScrollView>
              <Text>{add}</Text> 
          

            <TextInput
                style={{height: 40}}
                placeholder="Item Name:"
                onChangeText={newText => setName(newText)}
                value={newName}
            />
            <TextInput
                style={{height: 40}}
                placeholder="Description:"
                onChangeText={newText => setDes(newText)}
                value={newDes}
            />
            <TextInput
                style={{height: 40}}
                placeholder="Due Date: (ex: 1/1/2022)"
                onChangeText={newText => setDate(newText)}
                value={newDate}
            />

            <View style={styles.sectionContainer}>
                <Button
                title="Save"
                onPress={storeData}
                />
            </View>
            <View style={styles.sectionContainer}>
                <Button
                title="Clear"
                onPress={() => clearText()}
                />
            </View>
            </ScrollView>
        </View>
      
    )

}

export default Add;
