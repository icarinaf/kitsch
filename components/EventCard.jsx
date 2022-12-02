import { useRef } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback} from "react-native";

import CardFlip from 'react-native-card-flip';


export default function EventCard({data}){
    const card = useRef(null)
    return (

        <CardFlip ref={card} style={{width:'100%', height:430, borderRadius:20, marginTop:20, width:'90%'}}>
            <TouchableOpacity onPress={() => card.current.flip()} ><CardFront /></TouchableOpacity>
            <TouchableOpacity onPress={() => card.current.flip()} ><CardBack /></TouchableOpacity>
        </CardFlip>
    )
}


function CardFront(){
    return (
        <View style={{width:'100%', borderColor:'#ccc', height:'100%',borderRadius:20,  borderWidth:1,}}>
            <Image style={{width:'100%', height:300, borderTopLeftRadius:19, borderTopRightRadius:19}} source={{uri:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg'}}/>
            <View style={{padding:20, paddingTop:10}}>
                <Text style={{fontSize:25}}>Connor's Coffee Stand</Text>
                <Text style={{fontSize:15}}>0.3 mi · 6 min · $</Text>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <View style={{borderRadius:50, backgroundColor:'#FCA600', padding:10, paddingLeft:20, paddingRight:20}}>
                        <Text style={{fontSize:20, color:'#fff'}}>View Details</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
function CardBack(){
    return (
        <View style={{width:'100%', height:'100%', borderColor:'#ccc',borderRadius:20, borderWidth:1, padding:30}}>
            <Text style={{fontSize:25, fontWeight:'bold'}}>Connor's Coffee Stand{'\n'}</Text>
            <Text style={{fontSize:20, fontWeight:'bold'}}>What?</Text>
            <Text>Enjoy a delicious cup of hot brewed drip coffee for $2/cup made by your local Campus College Student, Connor!{'\n\n'}</Text>
            <Text style={{fontSize:20, fontWeight:'bold'}}>When?</Text>
            <Text>1-2pm Mondays, Wednesdays {'\n\n'}</Text>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Where?</Text>
            <Text>757 Campus Drive, EVGR-A Rm 203 {'\n\n'}</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <TouchableOpacity style={{borderRadius:50, backgroundColor:'#FCA600', padding:10, paddingLeft:20, paddingRight:20}}>
                    <Text style={{fontSize:20, color:'#fff'}}>Get Directions</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}