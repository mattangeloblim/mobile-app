import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { firebase } from "@react-native-firebase/app";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../config";
import { ref, onValue } from "firebase/database";

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const sensorRef = ref(db, "Sensor/");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      console.log(data);
      setHighlighted(true); 
      const timeout = setTimeout(() => {
        setHighlighted(false);
      }, 1000); // Reset highlighted after 1 second
      return () => clearTimeout(timeout);
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={() => navigation.navigate("PlantMatchPage")}
            >
              <Icon name="magic" size={20} color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Plant Matching</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("PlantPrefPage")}
            >
              <Icon name="cog" size={20} color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Plant Preference</Text>
            </TouchableOpacity>
            {!showStatus && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowStatus(!showStatus); // Toggle the showStatus state
                }}
              >
                {/* Use ellipsis-h icon for see more */}
                <Icon name="eye" size={20} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Sensor Values</Text>
              </TouchableOpacity>
            )}
          </View>

          {showStatus && ( // Conditionally render content based on showStatus
            <View style={styles.containerText}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowStatus(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text
                style={styles.title}
              >
                Air Quality
              </Text>
              <Text style={[styles.centeredText, { color: highlighted ? 'green' : 'white' }]}>
                Temperature: {sensorData && sensorData.temperature} °C
              </Text>
              <Text style={[styles.centeredText, { color: highlighted ? 'green' : 'white' }]}>
                Humidity: {sensorData && sensorData.humidity} %
              </Text>
              <Text style={[styles.centeredText, { color: highlighted ? 'green' : 'white' }]}>
                Heat Index: {sensorData && sensorData.heat_index.toFixed(2)} °C
              </Text>
              <Text style={[styles.centeredText, { color: highlighted ? 'green' : 'white' }]}>
                Air Quality Index: {sensorData && sensorData.mq135Value}
              </Text>
              <Text style={[styles.result, { color: highlighted ? 'green' : 'white' }]}>
                Air Quality is: {sensorData && sensorData.quality}
              </Text>
            </View>
          )}
          <StatusBar style="auto" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
  },
  content: {
    // borderWidth: 2,
    // borderColor: "red",
    height: "85%",
    display: "flex",
    justifyContent: "space-between",
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
    flexDirection: "row",
    marginBottom: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerText: {
    position: "relative",
    justifyContent: "flex-start",
    backgroundColor: "rgba(38, 166, 91, 0.4)",
    borderRadius: 10,
    height: "50%",
    padding: 20,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    color: "green",
  },
  centeredText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "justify",
    marginVertical: 5,
  },
  result: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
});
