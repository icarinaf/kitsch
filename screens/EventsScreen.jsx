import { SafeAreaView, Text, StyleSheet, View,  ScrollView} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';

import { supabase } from '../supabase';
import React, { useEffect } from 'react';
import Searchbar from '../components/Searchbar';
import EventCard from '../components/EventCard';
import NotificationPopup from 'react-native-push-notification-popup';


export default function EventsScreen() {

  React.useEffect(() => {
    this.popup.show({
      onPress: function() {console.log('Pressed')},
      // appIconSource: require('./assets/icon.jpg'),
      appTitle: 'UnCover',
      timeText: 'Now',
      title: 'Hello World',
      body: 'This is a sample message.\nTesting emoji 😀',
      slideOutTime: 5000
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#8F30A1', width:'100%', alignItems:'center', paddingBottom:10, paddingTop:40}}>
        <Searchbar white/>
      </View>
      <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center', backgroundColor:'white', paddingBottom:50}}>
        <Text style={{fontSize:30, fontWeight:'bold', paddingTop:20}}>Upcoming Events</Text>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </ScrollView>
      <NotificationPopup ref={ref => this.popup = ref} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
