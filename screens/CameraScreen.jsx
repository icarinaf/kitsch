import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground
} from "react-native"
import { Camera } from "expo-camera"
import WriteReviewScreen from "./WriteReviewScreen"
let camera
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState("off")

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === "granted") {
      setStartCamera(true)
    } else {
      Alert.alert("Access denied")
    }
  }
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {
    console.log('save photo called :', capturedImage)
  }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off")
    } else if (flashMode === "off") {
      setFlashMode("on")
    } else {
      setFlashMode("auto")
    }
  }
  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front")
    } else {
      setCameraType("back")
    }
  }
  return (
    <View style={styles.container}>
        <View
          style={{
            flex: 1,
            width: "100%"
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
              setPreviewVisible={setPreviewVisible}
            />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={r => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row"
                }}
              >
                <View style={{bottom: 0, position:'absolute', width:'100%', alignItems:'center', paddingBottom:20, backgroundColor: "rgba(0,0,0,0.5)",}}>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      width: "100%",
                      padding: 20,
                      justifyContent: "space-around",
                      alignItems:'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={__handleFlashMode}
                      style={{
                        backgroundColor: flashMode === "off" ? "#000" : "#fff",
                        borderRadius: "50%",
                        height: 50,
                        width: 50,
                        alignItems:'center', 
                        justifyContent:'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 40
                        }}
                      >
                        ⚡️
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        alignSelf: "center",
                        // flex: 1,
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: "#fff"
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={__switchCamera}
                      style={{
                        borderRadius: "50%",
                        height: 50,
                        width: 50,
                        alignItems:'center', 
                        justifyContent:'center',
                        
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 40
                        }}
                      >
                        {cameraType === "front" ? "🤳" : "📷"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{color:'#fff', fontWeight:'bold', fontSize:18}}>Snap a pic to review!</Text>
                </View>

              </View>
            </Camera>
          )}
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

const CameraPreview = ({ photo, retakePicture, savePhoto, setPreviewVisible }) => {
  console.log("sdsfds", photo)

  const [photoConfirmed, setPhotoConfirmed] = useState(false);

  console.log(photoConfirmed)
  if (photoConfirmed){
    return <WriteReviewScreen photo={photo} setPhotoConfirmed={setPhotoConfirmed} setPreviewVisible={setPreviewVisible} />
  }else{
      return (

    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%"
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop:20,
              justifyContent: "space-between",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>setPhotoConfirmed(true)}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: "#FFCA0E",
                  fontSize: 20
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
  }


}


// // import { Camera, CameraType } from 'expo-camera';
// // import { useState } from 'react';
// // import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as Permissions from 'expo-permissions';
// import { supabase } from '../supabase';

// export default function CameraScreen() {
//   const [camera, setCamera] = useState({
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back,
//   });

//   useEffect(async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    
//     setCamera(prevState => ({ ...prevState, hasCameraPermission: status === 'granted'}));

//   }, []);

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

//   const updatePlace = async() => {
//     try {
//       const {error} = await supabase.from('Recommendation Items').update({
//         rating: 4.8
//       }).eq('id', 11);
//       console.log("supabase update place function", error);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   const takePicture = async () => {
//     if (!camera) return
//     const photo = await camera.takePictureAsync();
//     console.log(photo)
//   }
  
//   if (camera.hasCameraPermission === null) {
//     return <View />;
//   } else if (camera.hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   } else {
//     return (
//       <View style={{ flex: 1 }}>
//         <Camera style={{ flex: 1, justifyContent:'flex-end'}} type={camera.type}>

//           <View style={{height:100, flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-around'}}>

//             <Text style={{ fontSize: 18, color: 'white' }}>
//               Settings
//             </Text>

//             <TouchableOpacity
//               onPress={takePicture}
//               style={{
//               width: 70,
//               height: 70,
//               bottom: 0,
//               borderRadius: 50,
//               backgroundColor: '#fff'
//             }}
//             />
            

//             <TouchableOpacity
//               style={{
//                 alignItems: 'center',

//               }}
//               onPress={() => {
//                setCamera({
//                   type:
//                     camera.type === Camera.Constants.Type.back?Camera.Constants.Type.front:Camera.Constants.Type.back,
//                 });
//               }}>
//               <Text style={{ fontSize: 18, color: 'white' }}>
//                 Flip
//               </Text>
//             </TouchableOpacity>

//           </View>
//         </Camera>
//       </View>
//     )
//   }
// }



// // import { StyleSheet } from 'react-native';

// // import EditScreenInfo from '../components/EditScreenInfo';
// // import { Text, View } from '../components/Themed';

// // import { supabase } from '../supabase';
// // import { Button } from 'react-native';
// // import React from 'react';

// // export default function CameraScreen() {
// //   const getPlaces = async() => {
// //     try {
// //       const {data, error} = await supabase.from('Recommendation Items').select('*');
// //       console.log("supabase getPlaces data", data);
// //       console.log("supabase error", error);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   }

// //   const addPlace = async() => {
// //     try {
// //       const {error} = await supabase.from('Recommendation Items').insert({
// //         name: "China Live Signature"
// //       });
// //       console.log("supabase add place function", error);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   }



// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Camera Screen</Text>
// //       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
// //       <Button title="add place" onPress={addPlace} />
// //       {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   separator: {
// //     marginVertical: 30,
// //     height: 1,
// //     width: '80%',
// //   },
// // });