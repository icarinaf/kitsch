import {
  TextInput,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Text,
  RecyclerViewBackedScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase";
import React, { useEffect, useState } from "react";
import Price from "./Price";
import Colors from "../constants/Colors";

export default function Feed({ feedData, feedOrder, tabNavigation, userData }) {
  const [likes, setLikeData] = React.useState([]);
  //console.log("in feed,", itemData);
  // console.log('filtering',
  // feedOrder.map(category=><FeedHorizontal title={category.title} data={itemData.filter(x=>x.category==category.tag)}/>)
  //console.log(feedData);
  // )
  //console.log(userData);
  //console.log(likes);
  console.log(likes[0]);

  const getLikes = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("id", 1);
      setLikeData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLikes();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Username: {userData[0].username}, Password: {userData[0].password}
      </Text>
      <FeedVertical
        tabNavigation={tabNavigation}
        data={feedData}
        likes={likes}
        userData={userData}
      />
      {/* {feedOrder.map((category) => (
        <FeedVertical
          tabNavigation={tabNavigation}
          title={category.title}
          data={itemData.filter((x) => x.category == category.tag)}
        />
      ))} */}
    </View>
  );
}

function FeedVertical({
  title,
  data,
  tabNavigation,
  likes = { likes },
  userData = { userData },
}) {
  // console.log('data in horizon', data, data.length)
  return (
    <View>
      <ScrollView>
        {data.map((item) => (
          <FeedItem
            tabNavigation={tabNavigation}
            item={item}
            likes={likes}
            userData={userData}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function FeedItem({
  item,
  tabNavigation,
  likes = { likes },
  userData = { userData },
}) {
  const navigation = useNavigation();
  const likes_status = likes[item.id - 1]
    ? "post #" +
      likes[item.id - 1].post_id +
      " was liked by user #" +
      likes[item.id - 1].user_id
    : "there are no likes for this post";
  console.log(item.comments[0]);
  return (
    <TouchableOpacity
      style={styles.feedItem}
      onPress={() => {
        navigation.navigate("PlaceDetail", {
          tabNavigation: tabNavigation,
          ...item,
        });
      }}>
      <View style={{ borderColor: Colors.dark.background }}>
        <Text style={styles.itemText}>{likes_status}</Text>
        <Image
          style={{ width: "100%", height: 250, marginBottom: 10 }}
          source={{ uri: item.image_uri }}
        />
        <View style={{ padding: 5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.username}>{item.user}</Text>
            {/* <Text style={styles.itemText}>
              <Ionicons name='md-star' size={15} color='orange' />
              {item.for_sale}/5
            </Text> */}
          </View>
          <Text style={styles.username}>Comments: </Text>
          <Text style={styles.itemText}>
            {" "}
            {userData[0].username} commented: {item.comments[0].comment}
          </Text>
          <Text style={styles.itemText}>at {item.comments[0].created_at} </Text>
          {/* <Text style={styles.itemText}>
            {item.mileage} mi ·{parseInt(item.distance)} min ·{" "}
            <Price value={item.price} />
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "88%",
    paddingTop: 20,
    alignSelf: "center",
  },
  feedItem: {
    padding: 13,
    marginBottom: 10,
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
  },
  username: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  itemText: {
    color: "white",
    fontSize: 17,
  },
});
