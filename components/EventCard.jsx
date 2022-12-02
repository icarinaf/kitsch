import { useRef } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback} from "react-native";

import CardFlip from 'react-native-card-flip';


export default function EventCard({data}){
    const card = useRef(null)
    return (

        <CardFlip ref={card} style={{width:'100%', height:450, borderRadius:20, marginTop:20, width:'90%'}}>
            <TouchableOpacity onPress={() => card.current.flip()} ><CardFront /></TouchableOpacity>
            <TouchableOpacity onPress={() => card.current.flip()} ><CardBack /></TouchableOpacity>
        </CardFlip>
    )
}


function CardFront(){
    return (
        <View style={{width:'100%', borderColor:'#ccc', height:'100%',borderRadius:20,  borderWidth:1,}}>
            <Image style={{width:'100%', height:300, borderTopLeftRadius:19, borderTopRightRadius:19}} source={{uri:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg'}}/>
            <View style={{padding:20}}>
                <Text style={{fontSize:15}}>Popup cafe</Text>
                <View style={{flexDirection:'row'}}>
                </View>
            </View>
        </View>
    )
}
function CardBack(){
    return (
        <View style={{width:'100%', height:'100%', borderColor:'#ccc',borderRadius:20, borderWidth:1,}}>
            <Text style={{fontSize:15}}>{'  '}Place details</Text>
        </View>
    )
}