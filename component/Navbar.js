import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Navbar({ onBackPress, onNextPress, onHomePress }) {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={onBackPress}>
        <Icon name="chevron-left" size={30} color="#fff" />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onHomePress}>
        <Icon name="home" size={30} color="#fff" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={onNextPress}>
        <Icon name="chevron-right" size={30} color="#fff" />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf:"center",
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 10,
  },
});
