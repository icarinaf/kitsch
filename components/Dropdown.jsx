import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabase';

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];

const DropdownComponent = (places) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const data = [];

  const createLabels = () => {
    if (places.places.length !== 0) {
      console.log("places--", places);
      console.log("places- ", places.places);
      const placeList = places.places;
      console.log("placeList-- ", placeList);
      for (var i = 0; i < placeList.length; i++) {
        console.log("placelist num ", placeList[i]);
        console.log('placelist id', placeList[i].id);
        const label_txt = placeList[i].name;
        console.log(label_txt);
        const label_id = placeList[i].id;
        data.push({label: label_txt, value: label_id});
        console.log(data);
      }
      //console.log(places.places[0]);
      // for (let i = 1; i < places.places.length; i++) {
      //     const label_txt = places.places[i].name;
      //     data.push({label: {label_txt}, value: i})
      //     console.log(data);
      // }
    }
  }

  const renderLabel = () => {
    createLabels();
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Choose Location ..."
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          setIsSelected(true);
        }}
        renderLeftIcon={() => (
            <Ionicons style={styles.icon} name={isSelected ? "location" : "location-outline"} size={20}/>
          )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '50%',
    marginBottom: 4,
  },
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  icon: {
    marginRight: 5,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 10,
  },
});