
import Searchbar from '../components/Searchbar';
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
       <View style={{backgroundColor:'#8F30A1', width:'100%', alignItems:'center', paddingBottom:10, paddingTop:40}}>
         <Searchbar white/>
       </View>
      <MapView style={styles.map} region={{
        latitude: 37.4275, 
        longitude: -122.1697,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});