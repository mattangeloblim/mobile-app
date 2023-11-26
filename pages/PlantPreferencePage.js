// PlantPreferencePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PlantPreferencePage = ({ route }) => {
  const { flower } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigation = useNavigation();

  const handleViewClick = async (id) => {
    try {
      const response = await axios.get(
        `http://54.252.234.41:9001/api/view/flower?id=${id}`
      );
  
      const flowerData = response.data;
  
      const flowerDataUnique = {
        name: flowerData.name,
        light: flowerData.light,
        fertilizer: flowerData.fertilizer,
        water: flowerData.water,
        soil: flowerData.soil,
        precaution: flowerData.precaution,
        imagePath: flowerData.imagePath,
      };
  
      navigation.navigate("FlowerDetails", { flower: flowerDataUnique });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/questionBg.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.rowContainer}>
        {flower.map((flower, index) => {
          return (
            <View key={index} style={styles.flowerContainer}>
              <Image
                source={{
                  uri: `https://drive.google.com/uc?id=${flower.imagePath}`,
                }}
                style={{ width: 100, height: 100 }}
              />
              <Text style={styles.name}> {flower.name}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewClick(flower.id)}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
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
  rowContainer: {
    flexDirection: "row",
    marginTop: "10px",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 8,
    marginTop: "30%",
  },
  flowerContainer: {
    position: "relative",
    width: "48%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  viewButton: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 4,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PlantPreferencePage;
