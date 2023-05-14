import {Image, Text, View,  StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Feed from '../components/Feed';
import Questions from '../components/Questions';
import Searchbar from '../components/Searchbar';
import { RootTabScreenProps } from '../types';
import { supabase } from '../supabase';
import React, { useEffect, useState } from 'react';
import History from '../components/History';
import PushNotifcations from '../push-notifs';
import Colors from '../constants/Colors';
import DropdownComponent from "../components/Dropdown";


// componentDidMount() {
//   this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
// }
// componentWillUnmount() {
//   clearInterval(this.interval);
// }

export default function HomeScreen({tabNavigation}) {
    const [itemData, setItemData] = React.useState([]);
    console.log('itemData --', itemData)
    const [feedOrder, setFeedOrder] = useState([{title:'Best Eats', tag:'restaurant'}, {title:'Explore Places', tag:'place'}, {title:'Shopping and Malls', tag:'shopping'}, {title:'Fun Things', tag:'activity'}]);
    const mediums = ["pottery", "ceramics", "oil painting"];
    const [selectedMedium, setSelectedMedium] = useState(0);

    // re-organizing feed --> helpful to reorganize data
    // useEffect(()=>{
    //   console.log(answers)
    //   // reorganize feed
    //   if (answers.length == 0){
    //     setFeedOrder([{title:'Best Eats', tag:'restaurant'}, {title:'Explore Places', tag:'place'}, {title:'Shopping and Malls', tag:'shopping'}, {title:'Fun Things', tag:'activity'}]);
    //   }else if (answers.length == 1){
    //     if (answers[0] == 0){
    //       setFeedOrder([{title:'Explore Places', tag:'place'}, {title:'Fun Things', tag:'activity'}, {title:'Best Eats', tag:'restaurant'}, {title:'Shopping and Malls', tag:'shopping'}, ])
    //     }else{
    //       setFeedOrder([{title:'Shopping and Malls', tag:'shopping'}, {title:'Best Eats', tag:'restaurant'}, {title:'Fun Things', tag:'activity'},{title:'Explore Places', tag:'place'}, ])
    //     }
    //   }
    // }, [answers])

    const getSelectedMedium = (id) => {
      console.log("id: " + id);
      setSelectedMedium(id);
    }

    const getPlaces = async() => {
        try {
            const {data, error} = await supabase.from('Items').select('*');
            setItemData(data);
            // console.log("supabase error", error);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
      const interval = setInterval(() => {
        getPlaces();
      }, 1000);
    
      return () => clearInterval(interval);
    }, []);


    // const deleteHistory = (i)=>{
    //   setAnswers(answers.slice(0, i))
    // }


  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 50, marginBottom: 5, width: '50%', height: 50, alignItems: 'center', alignSelf:'center'}}>
        <Image style={{width: '100%', height: '100%'}} source={require('../kitsch_logo.png')} />
      </View>
      <View style={{width:'80%', alignSelf:'center'}}>
        <Searchbar />
      </View>
      <View style={{flexDirection:'row'}}>
        <DropdownComponent mediums={mediums} getSelectedMedium={getSelectedMedium}/>
      </View>

      <Feed feedOrder={feedOrder} tabNavigation={tabNavigation} itemData={itemData}/>
      {/* r */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
