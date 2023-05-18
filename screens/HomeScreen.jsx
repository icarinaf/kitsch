import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Feed from "../components/Feed";
import Questions from "../components/Questions";
import Searchbar from "../components/Searchbar";
import { RootTabScreenProps } from "../types";
import { supabase } from "../supabase";
import React, { useEffect, useState } from "react";
import History from "../components/History";
import PushNotifcations from "../push-notifs";
import Colors from "../constants/Colors";
import DropdownComponent from "../components/Dropdown";

// componentDidMount() {
//   this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
// }
// componentWillUnmount() {
//   clearInterval(this.interval);
// }

export default function HomeScreen({ tabNavigation }) {
  const [feedData, setFeedData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [messages, setMessagesData] = React.useState([]);
  const [threads, setThreadData] = React.useState([]);
  const mediums = ["pottery", "ceramics", "oil painting"];
  const [selectedMedium, setSelectedMedium] = useState(0);
  // console.log("itemData --", itemData);
  // const [feedOrder, setFeedOrder] = useState([
  //   { title: "Best Eats", tag: "restaurant" },
  //   { title: "Explore Places", tag: "place" },
  //   { title: "Shopping and Malls", tag: "shopping" },
  //   { title: "Fun Things", tag: "activity" },
  // ]);

  // re-organizing feed --> helpful to reorganize data
  // useEffect(()=>{
  //   console.log(answers)
  //   // reorganize feed
  //   if (answers.length == 0){
  //     setFeedOrder([{title:'Best Eats', tag:'restaurant'}, {title:'Explore Places', tag:'place'}, {title:'Shopping and Malls', tag:'shopping'}, {title:'Fun Things', tag:'activity'}]);
  //   }else if (answers.length == 1){
  //     if (answers[0] == 0){
  //       setFeedOrder([{title:'Explore Places', tag:'place'}, {title:'Fun Things', tag:'activity'}, {title:'Best Eats', tag:'restaurant'}, {title:'Shopping and Malls', tag:'shopping'}, ])
  //     }else{
  //       setFeedOrder([{title:'Shopping and Malls', tag:'shopping'}, {title:'Best Eats', tag:'restaurant'}, {title:'Fun Things', tag:'activity'},{title:'Explore Places', tag:'place'}, ])
  //     }
  //   }
  // }, [answers])
  if (threads.length > 0) console.log(threads[0].thread[0]);

  const getSelectedMedium = (id) => {
    setSelectedMedium(id);
  };

  const getFeedItems = async () => {
    try {
      const { data, error } = await supabase.from("feed_items").select("*");
      setFeedData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = async () => {
    try {
      const { data, error } = await supabase.from("user_data").select("*");
      setUserData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMessagesThread = async () => {
    try {
      const { data, error } = await supabase.from("threads").select("*");
      setThreadData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMessages = async () => {
    try {
      const { data, error } = await supabase.from("messages").select("*");
      setMessagesData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getFeedItems();
      getUserData();
      getMessages();
      getMessagesThread();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // const deleteHistory = (i)=>{
  //   setAnswers(answers.slice(0, i))
  // }

  return (
    <View style={{ height: "100%", backgroundColor: Colors.light.background }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 50,
            marginBottom: 5,
            width: "50%",
            height: 50,
            alignItems: "center",
            alignSelf: "center",
          }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../kitsch_logo.png")}
          />
        </View>
        <View style={{ width: "80%", alignSelf: "center" }}>
          <Searchbar />
        </View>
        <View style={{ flexDirection: "row" }}>
          <DropdownComponent
            mediums={mediums}
            getSelectedMedium={getSelectedMedium}
          />
        </View>
        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
          Here is the current message thread:
        </Text>
        {threads.length > 0 && (
          <Text style={{ marginLeft: 10 }}>
            User #{threads[0].thread[0].user_id + 1}:{" "}
            {threads[0].thread[0].message}
            <Text style={{ color: "gray" }}>
              {" "}
              at {threads[0].thread[0].time}
              {"\n"}
            </Text>
            User #{threads[0].thread[1].user_id + 1}:{" "}
            {threads[0].thread[1].message}
            <Text style={{ color: "gray" }}>
              {" "}
              at {threads[0].thread[1].time}
              {"\n"}
            </Text>
          </Text>
        )}
        <Feed
          // feedOrder={feedOrder}
          tabNavigation={tabNavigation}
          feedData={feedData}
          userData={userData}
        />
        {/* r */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
