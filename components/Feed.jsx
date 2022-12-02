import { TextInput, StyleSheet, Image, View, ScrollView, Text, RecyclerViewBackedScrollView, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

import { supabase } from "../supabase";
import React from "react";
import Price from "./Price";

export default function Feed({itemData, feedOrder}){
    // console.log('in feed,', itemData )
    // console.log('filtering', 
    // feedOrder.map(category=><FeedHorizontal title={category.title} data={itemData.filter(x=>x.category==category.tag)}/>)
    
    // )
    return (
        <View style={styles.container}>
            {feedOrder.map(category=><FeedHorizontal title={category.title} data={itemData.filter(x=>x.category==category.tag)}/>)}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%', 
        paddingTop:20,
    },
});

function FeedHorizontal({title, data}){
    // console.log('data in horizon', data, data.length)
    return(
        <View style={{paddingTop:20}}>
            <Text style={{fontSize:30, paddingLeft:20, paddingBottom:10, fontWeight:'bold'}}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:20}}>
                {data.map(item=> <FeedItem item={item}/>)}
            </ScrollView>
        </View>
    )
}


function FeedItem({item}){
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={{paddingRight:20}} onPress={()=>{navigation.navigate('PlaceDetail', item)}}>
            <Image style={{width:230, height:150, borderRadius:15}} source={{uri:item.thumbnail_url}}/>
            <View style={{padding:5}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:17, fontWeight:'bold'}}>{item.name}</Text>
                    <Text><Ionicons name="md-star" size={15} color="orange" />{item.rating}/5</Text>
                </View>
                <Text>{item.mileage} mi ·{parseInt(item.distance)} min · <Price value={item.price}/></Text>
            </View>
        </TouchableOpacity>
    )
}