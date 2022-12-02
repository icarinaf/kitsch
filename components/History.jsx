import { Text, StyleSheet, View} from "react-native";


export default function History({emoji, answer}){
    return (
        <View style={{borderRadius:50, borderColor:'black', borderWidth:1, padding:5}}>
            <Text>{emoji} {answer} <Text style={{color:'#999', fontWeight:'bold', fontSize:16}}>x</Text> {' '}</Text>
        </View>
    )
}
