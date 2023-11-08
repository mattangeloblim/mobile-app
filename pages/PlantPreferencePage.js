// PlantPreferencePage.js
import React from "react";
import { View, Text, Image } from "react-native";

const PlantPreferencePage = ({ route }) => {
  const { flowers } = route.params;

  return (
    <View>
      <View>
        {flowers.map((flower, index) => (
          <View key={index}>
            <Text>{flower.name}</Text>
            <Text>Description: {flower.description}</Text>
            <Image
            source={{ uri: `https://drive.google.com/uc?id=${flower.imagePath}` }}
            style={{ width: 100, height: 100 }}
          />
          </View>
        ))}
      </View>
    </View>
  );
};

export default PlantPreferencePage;
