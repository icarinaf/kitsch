import { TextInput, StyleSheet, Image, View, ScrollView, Text, RecyclerViewBackedScrollView, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

import { supabase } from "../supabase";
import React from "react";

export default function Feed(){
    const getPlaces = async() => {
        try {
            const {data, error} = await supabase.from('Items').select('*');
            console.log("supabase getPlaces data", data);
            console.log("supabase error", error);
        } catch (err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        getPlaces();
    }, []);

    // const displayFeedHorizontals = () => {
    //     for (var i = 0; i < data.size; i++) {
    //         console.log(data[i]);
    //     }
    // }

    return (
        <View style={styles.container}>
            {/* {displayFeedHorizontals()} */}
            <FeedHorizontal />
            <FeedHorizontal />
            <FeedHorizontal />
            <FeedHorizontal />
            <FeedHorizontal />
            <FeedHorizontal />
            <FeedHorizontal />
            <FeedHorizontal />
            <FeedHorizontal />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%', 
        paddingTop:20,
        // flexDirection:'row',
        // height:50, 
        // paddingTop:50,
        // padding: 10, 
        // borderBottomWidth:1, 
        // borderBottomColor:'#000',
        // paddingBottom:15,
        // backgroundColor: '#8F30A1',
    },
});

function FeedHorizontal(){
    return(
        <View style={{paddingTop:20}}>
            <Text style={{fontSize:30, paddingLeft:20, paddingBottom:10, fontWeight:'bold'}}>Top Eats</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:20}}>
                <FeedItem />
                <FeedItem />

                <FeedItem />

                <FeedItem />

                <FeedItem />

            </ScrollView>
        </View>
    )
}


function FeedItem(){
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={{paddingRight:20}} onPress={()=>{navigation.navigate('PlaceDetail')}}>
            <Image style={{width:230, height:150, borderRadius:15}} source={{uri:'https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/6593230/691c8fde-bd07-44b1-8fad-7002a2b5a9f7.jpg'}}/>
            <View style={{padding:5}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:17, fontWeight:'bold'}}>China Live</Text>
                    <Text><Ionicons name="md-star" size={15} color="orange" />3.9/4</Text>
                </View>
                <Text>0.9 mi ·10 min · $$</Text>
            </View>
        </TouchableOpacity>
    )
}