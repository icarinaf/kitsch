import {Text, View,  StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Feed from '../components/Feed';
import Questions from '../components/Questions';
import Searchbar from '../components/Searchbar';
import { RootTabScreenProps } from '../types';
import { supabase } from '../supabase';
import React from 'react';

export default function HomeScreen() {
  const [itemData, setItemData] = React.useState({});
    console.log(itemData)

    const getPlaces = async() => {
        try {
            const {data, error} = await supabase.from('Items').select('*');
            //console.log("supabase getPlaces data", data);
            setItemData(data);
            console.log("supabase error", error);
        } catch (err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        getPlaces();
    }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Questions />
      <Searchbar />
      <Feed />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'white',
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
