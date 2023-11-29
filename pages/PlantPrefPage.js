import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../component/Navbar";
// import { TouchableOpacity } from "react-native";

const PlantPrefPage = () => {
  const navigate = useNavigation();

  const handleBackButton = () => {
    navigate.goBack();
  };

  return (
    <ImageBackground
        source={require("../assets/preference.png")}
        style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <View style={styles.mainView}>
            <Text style={styles.mainViewText}>
              You are about to answer questions to help in suggesting a suitable
              indoor plant to take care of, would you like to proceed?
            </Text>
          </View>
          <View style={styles.childView}>
            <TouchableOpacity onPress={() => navigate.navigate("PlantPrefQPage")}>
              <Text style={styles.childViewOption}>Continue</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.childView}>
            <TouchableOpacity onPress={handleBackButton}>
              <Text style={styles.childViewOption2}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Navbar/>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  centeredContainer: {
    height: 200,
    width: 250,
    marginTop: 200,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "gray", // Add a gray border
    borderWidth: 2, // Set the border width
    borderRadius: 10, // Add border radius
  },
  mainView: {
    width: 230,
    height: 110,
    backgroundColor: "rgba(105, 105, 105, 0.7)",
    marginBottom: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  mainViewText: {
    color: "white",
    textAlign: "justify",
    padding: 6,
    fontSize: 15,
  },
  childView: {
    width: 230,
    height: 35,
    backgroundColor: "rgba(169, 169, 169, 0.5)",
    marginBottom: 2,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
  },
  childViewOption: {
    color: "white",
    textAlign: "center",
    padding: 6,
    fontSize: 15,
  },
  childViewOption2: {
    color: "red",
    textAlign: "center",
    padding: 6,
    fontSize: 15,
  },
});

export default PlantPrefPage;
