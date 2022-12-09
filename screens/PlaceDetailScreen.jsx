import { SafeAreaView, View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Price from '../components/Price';


export default function PlaceDetailScreen({navigation, route}) {
    const {name, thumbnail_url, rating, mileage, price, distance, Reviews, tabNavigation} = route.params;
    const stars = [];
    for (let i = 1; i <= 5; i++){
        if (i-0.5<=rating) {
            stars.push(<Ionicons name="md-star" size={24} color="orange" />);
        }else{
            stars.push(<Ionicons name="md-star" size={24} color="grey" />);
        }
    }

    
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image style={{width:'100%', height:300}} source={{uri:thumbnail_url}}/>
        <View style={{padding:20}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontSize:24, fontWeight:'bold'}}>{name}</Text>
                    <Text> 
                        {stars}
                        {' '} {rating}/5
                    </Text>
                    <Text>{mileage} mi · {distance} min · <Price value={price}/> · <Text style={{color:"#999", textDecorationLine: 'underline'}}>Get Directions</Text></Text>
                </View>
                <TouchableOpacity onPress={()=>tabNavigation.navigate('Camera')} style={{backgroundColor:'#000', width:70, height:70, justifyContent:'center', alignItems:'center', borderRadius:200}}>
                    <Ionicons name="md-camera-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        </View>
        {Reviews == null ? null : 
        <View style={{paddingLeft:10, paddingRight:10, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flex:1}}>
                <Text style={{fontSize:24, fontWeight:'bold', marginBottom:20, marginLeft:10}}>Reviews</Text>
                {Reviews.map((x, i)=>i % 2 == 0 ? <ReviewItem data={x}/> : null )}
            </View>
            <View style={{flex:1}}>
                {Reviews.map((x, i)=>i % 2 == 1 ? <ReviewItem data={x}/> : null )}
            </View>

        </View>
        }   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor:'#fff',
  },
  boxShadow:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  }
});

export function Rating({value}){
    const stars = [];
    for (let i = 1; i <= 5; i++){
        if (i-0.5<=value) {
            stars.push(<Ionicons name="md-star" size={24} color="orange" />);
        }else{
            stars.push(<Ionicons name="md-star" size={24} color="grey" />);
        }
    }
    return stars
}

function ReviewItem({data}){
    const navigation = useNavigation()
    console.log(data)
    const {created_at, rating, review, url, user} = data;
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('reviewDetail', data)} style={[{ marginLeft:10, marginRight:10, marginBottom:20, borderRadius:5, backgroundColor:'white'}, styles.boxShadow]}>
            <Image style={{width:'100%', height:200, borderTopRightRadius:5, borderTopLeftRadius:5}} source={{uri:url}}/>
            <View style={{padding:5}}>
                <View style={{flexDirection:'row'}}>
                    <Rating value={rating}/>
                </View>
                <Text style={{color:'#999', paddingLeft:10, paddingRight:0}}>{review.length > 24 ? review.slice(0, 21) + '...' : review}</Text>
            </View>
        </TouchableOpacity>
    )
}