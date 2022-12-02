import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, Image, View, StyleSheet, Text, SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Rating } from './PlaceDetailScreen';

export default function ReviewDetailScreen({route}) {
  const {created_at, rating, review, url, user} = route.params;
  return (
    <ScrollView style={styles.container}>
      <Image style={{width:'100%', height:500}} source={{uri:url}}/>
      <View style={{padding:20}}>
        <Text style={{fontSize:25}}>{user}</Text>
        <Text style={{fontSize:15}}>Mission Dolores Park, San Francisco</Text>
        <View style={{flexDirection:'row'}}>
          <Rating value={rating}/>
        </View>
        <Text style={{fontSize:18, paddingTop:15, paddingBottom:15}}>{review}</Text>
        <Text style={{fontStyle:'italic'}}>Posted on {created_at}</Text>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
  },
});
