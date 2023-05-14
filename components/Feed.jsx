import { TextInput, StyleSheet, Image, View, ScrollView, Text, RecyclerViewBackedScrollView, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase";
import React from "react";
import Price from "./Price";
import Colors from "../constants/Colors";

export default function Feed({itemData, feedOrder, tabNavigation}){
    // console.log('in feed,', itemData )
    // console.log('filtering', 
    // feedOrder.map(category=><FeedHorizontal title={category.title} data={itemData.filter(x=>x.category==category.tag)}/>)
    
    // )
    return (
        <View style={styles.container}>
            {feedOrder.map(category=><FeedHorizontal tabNavigation={tabNavigation} title={category.title} data={itemData.filter(x=>x.category==category.tag)}/>)}
        </View>
    )
}


function FeedHorizontal({title, data, tabNavigation}){
    // console.log('data in horizon', data, data.length)
    return(
        <View>
            <ScrollView>
                {data.map(item=> <FeedItem tabNavigation={tabNavigation} item={item}/>)}
            </ScrollView>
        </View>
    )
}


function FeedItem({item, tabNavigation}){
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.feedItem} onPress={()=>{navigation.navigate('PlaceDetail', {tabNavigation:tabNavigation, ...item})}}>
            <View style={{borderColor: Colors.dark.background}}>
                <Image style={{width:'100%', height:250, marginBottom: 10}} source={{uri:item.thumbnail_url}}/>
                <View style={{padding:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.username}>{item.name}</Text>
                        <Text style={styles.itemText} ><Ionicons name="md-star" size={15} color="orange" />{item.rating}/5</Text>
                    </View>
                    <Text style={styles.itemText}>{item.mileage} mi ·{parseInt(item.distance)} min · <Price value={item.price}/></Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'88%', 
        paddingTop:20,
        alignSelf:'center'
    },
    feedItem: {
        padding: 13,
        marginBottom: 10,
        backgroundColor: Colors.dark.background,
        borderRadius: 10,
    },
    username: {
        color: 'white',
        fontSize:17, 
        fontWeight:'bold'
    },
    itemText: {
        color: 'white',
        fontSize:17, 
    }
});