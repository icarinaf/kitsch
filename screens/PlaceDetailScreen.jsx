import { SafeAreaView, View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


export default function PlaceDetailScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image style={{width:'100%', height:300}} source={{uri:'https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/6593230/691c8fde-bd07-44b1-8fad-7002a2b5a9f7.jpg'}}/>
        <View style={{padding:20}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontSize:24, fontWeight:'bold'}}>Mission Dolores Park</Text>
                    <Text> 
                        <Ionicons name="md-star" size={24} color="orange" />
                        <Ionicons name="md-star" size={24} color="orange" />
                        <Ionicons name="md-star" size={24} color="orange" />
                        <Ionicons name="md-star" size={24} color="orange" />
                        <Ionicons name="md-star" size={24} color="grey" />
                        {' '} 4.3/5
                    </Text>
                    <Text>1.9 mi · 23 min · $ · <Text style={{color:"#999", textDecorationLine: 'underline'}}>Get Directions</Text></Text>
                </View>
                <TouchableOpacity style={{backgroundColor:'#000', width:70, height:70, justifyContent:'center', alignItems:'center', borderRadius:200}}>
                    <Ionicons name="md-camera-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{paddingLeft:10, paddingRight:10, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flex:1}}>
                <Text style={{fontSize:24, fontWeight:'bold', marginBottom:20, marginLeft:10}}>Reviews</Text>
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
            </View>
            <View style={{flex:1}}>
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
            </View>

        </View>
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


function ReviewItem(){
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('reviewDetail')} style={[{ marginLeft:10, marginRight:10, marginBottom:20, borderRadius:5, backgroundColor:'white'}, styles.boxShadow]}>
            <Image style={{width:'100%', height:200, borderTopRightRadius:5, borderTopLeftRadius:5}} source={{uri:'https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/6593230/691c8fde-bd07-44b1-8fad-7002a2b5a9f7.jpg'}}/>
            <View style={{padding:5}}>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="md-star" size={24} color="orange" />
                    <Ionicons name="md-star" size={24} color="orange" />
                    <Ionicons name="md-star" size={24} color="orange" />
                    <Ionicons name="md-star" size={24} color="orange" />
                    <Ionicons name="md-star" size={24} color="grey" />
                </View>
                <Text style={{color:'#999', paddingLeft:10, paddingRight:0}}>Not bad</Text>
            </View>
        </TouchableOpacity>
    )
}