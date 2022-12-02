import { Text, StyleSheet, View} from "react-native";


export default function Price({value}){
    let price = '';
    for (let i = 1; i < value; i++){
        price += '$';
    }
    return (
        <Text>{price == '' ? 'Free' : price}</Text>
    )
}
