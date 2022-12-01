import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { supabase } from '../supabase';
import { Button } from 'react-native';
import React from 'react';

export default function CameraScreen() {
  const getPlaces = async() => {
    try {
      const {data, error} = await supabase.from('Recommendation Items').select('*');
      console.log("supabase getPlaces data", data);
      console.log("supabase error", error);
    } catch (err) {
      console.error(err);
    }
  }

  const addPlace = async() => {
    try {
      const {error} = await supabase.from('Recommendation Items').insert({
        name: "China Live Signature"
      });
      console.log("supabase add place function", error);
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    getPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="add place" onPress={addPlace} />
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
