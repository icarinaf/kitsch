import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons'; 
import Stars from 'react-native-stars';
import { supabase } from "../supabase";





export default function WriteReviewScreen({ photo, setPhotoConfirmed}){
    console.log("WriteReviewScreen photo", photo)
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [locationName, setLocationName] = useState('Stanford University');

    const setDone = ()=>{
        console.log('done! navigate back')
    }

    const updatePlace = async(imgUrl, ratingNum, reviewText) => {
      newData = {url: imgUrl, rating: ratingNum, review: reviewText};
      try {
        const {data, err} = await supabase.from('Items').select('Reviews').eq('id', 5);
        // query the jsonb data from the url
        console.log(data);
        // `data` should contain an array
        data.push(newData);
        console.log(data);
        const {error} = await supabase.from('Items').update({
          Reviews: newData
        }).eq('id', 5);
        console.log("supabase update place function", error);
      } catch (err) {
        console.error(err);
      }
    }

    const submitReview = ()=>{
        console.log('photo:', photo.uri);
        console.log('rating:', rating);
        console.log('review:', reviewText);
        updatePlace(photo.uri, rating, reviewText);
        console.log("update reviews complete");

        // use this function to exit, I will edit later
        setDone();
    }

    return (
      <KeyboardAvoidingView
        style={{
          backgroundColor: "white",
          flex: 1,
          width: "100%",
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1
          }}
        >

            <View style={{position:'absolute', top:50, left:10, zIndex:100}}>
                <TouchableOpacity onPress={()=>setPhotoConfirmed(false)}>
                    <Ionicons name="chevron-back" size={40} color="black"/>
                </TouchableOpacity>   
            </View>   


          <KeyboardAvoidingView
            behavior="padding" 
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <View
              style={{
                padding:20,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
                <Text style={{color:'white', fontSize:15}}>{locationName}{'\n'}</Text>
                <Text style={{color:'white', fontSize:25}}>RATING: 
                <Stars
                    style={{marginBottom:-5}}
                    half={false}
                    default={0}
                    update={(val)=>{setRating(val)}}
                    spacing={4}
                    starSize={25}
                    count={5}
                    fullStar={<Ionicons name="md-star" size={24} color="orange" />}
                    emptyStar={<Ionicons name="md-star" size={24} color="grey" />}
                />
                {'\n'}</Text>
                <TextInput blurOnSubmit value={reviewText} onChangeText={setReviewText} style={{backgroundColor:'white', fontSize:18, height:100, padding:10, borderTopLeftRadius:10, borderTopRightRadius:10}} multiline placeholder='Leave a review...'/>
                <TouchableOpacity onPress={submitReview} style={{backgroundColor:'#8F30A1', borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{color:'white', fontSize:18, padding:10}}>Post</Text>
                </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }