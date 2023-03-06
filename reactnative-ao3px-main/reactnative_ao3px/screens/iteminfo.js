//Alexis Osipovs, ao3px
  /***************************************************************************************
  
  *  REFERENCES:
  *  Title: Full Modern React Tutorial 
  *  Tutorial videos referenced: #8 Using State (useState hook), #9 Intro to React Dev Tools, #10 Outputting Lists, #13 Functions as Props, #14 useEffect Hook
  *  URL: https://www.youtube.com/watch?v=tHjxSVaj_wY&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=10 

  * Title: Accessing Data:
  *  URL: https://www.pluralsight.com/guides/accessing-data-through-props-with-known-key-names-in-reactjs
  *  URL: https://blog.logrocket.com/data-fetching-react-native/ 
  *  URL: 
  
  * Title: AsyncStorage Usage
  *  URL: https://www.mindbowser.com/asyncstorage-in-react-native/ 

  ***************************************************************************************/
import React, {useEffect, useState} from "react";
import { View, Text, TextInput, Button, Alert , DatePicker, ScrollView} from 'react-native'
import styles from "../styles/styles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';


const ItemInfo = ({ navigation, route }) => {
    const currentTitle = "Item Info";  
    const storageKey = '@bucketList';

    const [newName2, setNewName] = useState('');
    const [newDes2, setNewDes] = useState('');
    const [newDate2, setNewDate] = useState('');
    const trackID= route.params.id; //from  key={item.id} in app.js


    //need useeffect, set all data points, sending directly from home route.params.key
        //.find on array get specific element that matches the item with the same key 

    retrieveData = async () => {
        try{
            const getitems = await AsyncStorage.getItem(storageKey)
            console.log('getitems: ', getitems);
            const items = JSON.parse(getitems);
            console.log('items: ', items);
            console.log('trackid: ', trackID)
            const findItem = items.find((element) => {return (element.id == trackID)});
            console.log('finditem: ', findItem); //undefined
            return findItem;
     }  catch(e){return null;}
    };

    useEffect(() => {
        (async () => {
            try{
                const value = await retrieveData();

                if(value !== null){
                    setNewName(value.name); //sets the data based on what's passed in from list.js
                    setNewDes(value.des);
                    setNewDate(value.date);
                }

            }catch (error){}
        })();
    }, []);

    //from add.js
    //updates the entire list of async items
    const storeData = async (value) => { //createbucketitem, savebucketitem
        try {
            const item = {id: Date.now(), name: newName2, des: newDes2, date: newDate2}
            const listOfItems = await AsyncStorage.getItem(storageKey) 
            const fulllist = JSON.parse(listOfItems)
            const newList = [...fulllist, item] //append new object to the old bucket
            await AsyncStorage.setItem(storageKey, JSON.stringify(newList))
            navigation.navigate('List') //immediately return to home screen
        } catch (e) {
            // saving error
        }
    }

    return (

            <View style={{padding: 10}}>
                <ScrollView>
          
            <TextInput
                style={{height: 40}}
                placeholder="Item Name:"
                onChangeText={newText => setNewName(newText)}
                value={newName2}
            />
            <TextInput
                style={{height: 40}}
                placeholder="Description:"
                onChangeText={newText => setNewDes(newText)}
                value={newDes2}
            />
            <TextInput
                style={{height: 40}}
                placeholder="Due Date:"
                onChangeText={newText => setNewDate(newText)}
                value={newDate2}
            />

            <View style={styles.sectionContainer}>
                <Button
                title="Save"
                onPress={() => storeData()}
                />
            </View>
            {/* <View style={styles.sectionContainer}>
                <Button
                title="Clear"
                onPress={() => handleClearEvent()}
                />
            </View> */}
            </ScrollView>
        </View>

    )

}

export default ItemInfo;
