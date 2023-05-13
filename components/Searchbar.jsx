import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, StyleSheet, View} from "react-native";


export default function Searchbar({white}){

    return (
        <View style={styles.container}>
            <MaterialIcons name='search' size={30} color={white ? 'white' : 'black'} />
            <TextInput style={{fontSize:20, width:1000}} placeholderTextColor={white ? '#ccc' : '#999'} placeholder="Search..." />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'100%',
        height:40, 
        marginTop: 5,
        padding: 10, 
        backgroundColor: '#FFF',
        borderRadius: 10
    }
});
