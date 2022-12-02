// import { Camera, CameraType } from 'expo-camera';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function CameraScreen() {
  const [camera, setCamera] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  });

  useEffect(async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    
    setCamera(prevState => ({ ...prevState, hasCameraPermission: status === 'granted'}));

  }, []);

  const addPlace = async() => {
    try {
      const {error} = await supabase.from('Recommendation Items').insert({
        name: "China Live Signature"
      });
      console.log("supabase add place function", error);
    } catch (err) {
      console.error(err);
    }
  }

  
  if (camera.hasCameraPermission === null) {
    return <View />;
  } else if (camera.hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1, alignItems:'center'}} type={camera.type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',

              }}
              onPress={() => {
               setCamera({
                  type:
                    camera.type === Camera.Constants.Type.back?Camera.Constants.Type.front:Camera.Constants.Type.back,
                });
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}
                Flip{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  }
}



// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

// import { supabase } from '../supabase';
// import { Button } from 'react-native';
// import React from 'react';

// export default function CameraScreen() {
//   const getPlaces = async() => {
//     try {
//       const {data, error} = await supabase.from('Recommendation Items').select('*');
//       console.log("supabase getPlaces data", data);
//       console.log("supabase error", error);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   const addPlace = async() => {
//     try {
//       const {error} = await supabase.from('Recommendation Items').insert({
//         name: "China Live Signature"
//       });
//       console.log("supabase add place function", error);
//     } catch (err) {
//       console.error(err);
//     }
//   }



//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Camera Screen</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <Button title="add place" onPress={addPlace} />
//       {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
