import { Text, StyleSheet, View, TouchableOpacity} from "react-native";


export default function History({emoji, answer, i, deleteHistory}){
    return (
        <TouchableOpacity onPress={()=>deleteHistory(i)} style={{borderRadius:50, borderColor:'black', borderWidth:1, padding:5}}>
            <Text>{emoji} {answer} <Text style={{color:'#999', fontWeight:'bold', fontSize:16}}>x</Text> {' '}</Text>
        </TouchableOpacity>
    )
}
