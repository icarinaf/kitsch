import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';

export default function Questions({ setAnswer, question }) {

  return (
    <View style={styles.container}>
      <Text style={{fontSize:40,color:'#fff'}}>Hi there</Text>
      <Text style={{fontSize:20, color:'#fff'}}>How are you feeling today?</Text>
      <View style={{flexDirection:'row', backgroundColor:'#8F30A1', justifyContent:'space-between', paddingTop:20}}>
        <AnswerButton displayText='🤩 Adventurous!'/>
        <AnswerButton displayText='🥱 A bit tired...'/>
      </View>
    </View>
  );
}

function AnswerButton({displayText}){
    return (
        <TouchableOpacity style={{backgroundColor:'#fff', padding:13, borderRadius:50}}>
            <Text style={{fontSize:17}}>{displayText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingTop:50,
        padding: 30, 
        paddingBottom:15,
        backgroundColor: '#8F30A1',
    }
});
