import { SafeAreaView, Text, StyleSheet, View,  ScrollView} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';

import { supabase } from '../supabase';
import React from 'react';
import Searchbar from '../components/Searchbar';
import EventCard from '../components/EventCard';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#8F30A1', width:'100%', alignItems:'center', paddingBottom:10, paddingTop:40}}>
        <Searchbar white/>
      </View>
      <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center', backgroundColor:'white', paddingBottom:50}}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </ScrollView>
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
