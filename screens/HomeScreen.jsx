import {Text, View,  StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Feed from '../components/Feed';
import Questions from '../components/Questions';
import Searchbar from '../components/Searchbar';
import { RootTabScreenProps } from '../types';
import { supabase } from '../supabase';
import React, { useEffect, useState } from 'react';
import History from '../components/History';
import PushNotifcations from '../push-notifs';


// componentDidMount() {
//   this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
// }
// componentWillUnmount() {
//   clearInterval(this.interval);
// }

export default function HomeScreen({tabNavigation}) {


    let questions = [
      {Q: 'How are you feeling today?', A:[{emoji:'🤩', text:'Adventurous!'}, {emoji:'🥱', text:'A bit tired...'}]},
      {Q: 'Do you prefer to stay...', A:[{emoji:'🧗‍♀️', text:'Outdoors'}, {emoji:'🎨', text:'Indoors'}]},

    ]
    const [currQuestion, setCurrQuestion] = useState(0);

    const [answers, setAnswers] = useState([])



    const answerQuestion = (answer)=>{
      if (answers.length >= 2){
        setAnswers([answer]);
      }else{
        setAnswers(answers.concat(answer))
      }
      // setCurrQuestion((answers.length + 1) % 2);
    }


    useEffect(()=>{
      setCurrQuestion((answers.length ) % 2);
    }, [answers])


    const [itemData, setItemData] = React.useState([]);
    console.log('itemData --', itemData)
    const [feedOrder, setFeedOrder] = useState([{title:'Best Eats', tag:'restaurant'}, {title:'Explore Places', tag:'place'}, {title:'Shopping and Malls', tag:'shopping'}, {title:'Fun Things', tag:'activity'}]);

    useEffect(()=>{
      console.log(answers)
      // reorganize feed
      if (answers.length == 0){
        setFeedOrder([{title:'Best Eats', tag:'restaurant'}, {title:'Explore Places', tag:'place'}, {title:'Shopping and Malls', tag:'shopping'}, {title:'Fun Things', tag:'activity'}]);
      }else if (answers.length == 1){
        if (answers[0] == 0){
          setFeedOrder([{title:'Explore Places', tag:'place'}, {title:'Fun Things', tag:'activity'}, {title:'Best Eats', tag:'restaurant'}, {title:'Shopping and Malls', tag:'shopping'}, ])
        }else{
          setFeedOrder([{title:'Shopping and Malls', tag:'shopping'}, {title:'Best Eats', tag:'restaurant'}, {title:'Fun Things', tag:'activity'},{title:'Explore Places', tag:'place'}, ])
        }
      }
    }, [answers])

    const getPlaces = async() => {
        try {
            const {data, error} = await supabase.from('Items').select('*');
            setItemData(data);
            // console.log("supabase error", error);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
      const interval = setInterval(() => {
        getPlaces();
      }, 1000);
    
      return () => clearInterval(interval);
    }, []);

    console.log('here', answers, Array(answers), answers.map((x, i)=>questions[x].A[i].emoji))

    const deleteHistory = (i)=>{
      setAnswers(answers.slice(0, i))
    }


  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Questions question={questions[currQuestion]} setAnswer={answerQuestion}/>
      <View style={{flexDirection:'row', paddingTop:5, paddingLeft:20, justifyContent:'flex-start'}}>
        {answers.map((x, i)=><><History i={i} deleteHistory={deleteHistory} emoji={questions[i].A[x].emoji} answer={questions[i].A[x].text}/><Text>{' '}</Text></>)}
      </View>
      <View style={{paddingLeft:20, width:440}}>
        <Searchbar/>
      </View>
      <Feed feedOrder={feedOrder} tabNavigation={tabNavigation} itemData={itemData}/>
      <PushNotifcations tabNavigation={tabNavigation}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor:'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
