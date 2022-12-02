import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, StyleSheet, View} from "react-native";


export default function Searchbar({white}){

    return (
        <View style={[styles.container, white ? {borderBottomColor:'#fff'}:{borderBottomColor:'#000'}]}>
            <MaterialIcons name='search' size={30} color={white ? 'white' : 'black'} style={{paddingRight:5}} />
            <TextInput style={{fontSize:20, width:5000}} placeholderTextColor={white ? '#ccc' : '#999'} placeholder="Search here..." />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'90%',
        height:50, 
        marginTop:10,
        padding: 10, 
        borderBottomWidth:1, 
        // borderBottomColor:'#000',
        // paddingBottom:15,
        // backgroundColor: '#8F30A1',
    }
});
