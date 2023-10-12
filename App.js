import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => alert("BOBO SI KYLE")}
          >
            <Text style={styles.buttonText}>Plant Matching</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("BOBO SI KYLE")}
          >
            <Text style={styles.buttonText}>Plant Preference</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.title}>Air Quality</Text>
          <Text style={styles.centeredText}>Temperature: 30°C</Text>
          <Text style={styles.centeredText}>Humidity: 95%</Text>
          <Text style={styles.centeredText}>Gas Level:</Text>
          <Text style={styles.centeredText}>Air Quality Index:</Text>
          <Text style={styles.result}>Air Quality is: Fresh Air</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content:{
    // borderWidth: 2,
    // borderColor: "red",
    height:"80%",
    display:"flex",
    justifyContent:"space-between"
  },
  buttonContainer: {
    marginTop: "40%",
    height: "fit",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "black",
  },
  button: {
    justifyContent: "center",
    textAlign: "center",
    height: 60,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerText: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(38, 166, 91, 0.6)", 
    marginTop: 10,
    height: "auto",
    paddingTop: "15%",
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  centeredText: {
    // justifyContent: "justify",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
