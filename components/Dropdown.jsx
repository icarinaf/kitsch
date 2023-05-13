import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';


const DropdownComponent = (props) => {
  const places = props.places;
  //console.log("props--", props);
  const getSelectedPlace = props.getSelectedPlace;
  //console.log(props.getSelectedPlace);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const data = [{label: "ADD LOCATION+", value: 0}];

  const createLabels = () => {
    if (places && places.length !== 0) {
      //console.log("places--", places);
      for (var i = 0; i < places.length; i++) {
        const label_txt = places[i].name;
        const label_id = places[i].id;
        data.push({label: label_txt, value: label_id});
        //console.log(data);
      }
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
        placeholder="Medium"
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          setIsSelected(true);
          getSelectedPlace(item.value);
          //console.log("item value: " + item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 100,
    marginBottom: 4,
  },
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'white',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
    color: 'white',
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