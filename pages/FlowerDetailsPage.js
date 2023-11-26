// FlowerDetails.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const FlowerDetails = ({ route }) => {
  const { flower } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/questionBg.png")}
        style={styles.backgroundImage}
      />
      <Image
        source={{
          uri: `https://drive.google.com/uc?id=${flower.imagePath}`,
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.name}>{flower.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Light:</Text>
        <Text style={styles.description}>{flower.light}</Text>
        <Text style={styles.label}>Fertilizer:</Text>
        <Text style={styles.description}>{flower.fertilizer}</Text>
        <Text style={styles.label}>Water:</Text>
        <Text style={styles.description}>{flower.water}</Text>
        <Text style={styles.label}>Soil:</Text>
        <Text style={styles.description}>{flower.soil}</Text>
        <Text style={styles.label}>Precaution:</Text>
        <Text style={styles.description}>{flower.precaution}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default FlowerDetails;
