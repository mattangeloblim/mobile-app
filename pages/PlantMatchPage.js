import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function PlantMatchPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImageName2, setSelectedImageName2] = useState(null);
  const [prediction2, setPrediction2] = useState(null);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async (plantNumber) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uriParts = result.uri.split("/");
      const filename = uriParts[uriParts.length - 1];

      if (plantNumber === 1) {
        setSelectedImage(result.uri);
        setSelectedImageName(filename);
      } else if (plantNumber === 2) {
        setSelectedImage2(result.uri);
        setSelectedImageName2(filename);
      }
    }
  };

  const handlePredictClick = (plantNumber) => {
    const selectedImageState =
      plantNumber === 1 ? selectedImage : selectedImage2;
    const selectedImageNameState =
      plantNumber === 1 ? selectedImageName : selectedImageName2;
    const setPredictionState =
      plantNumber === 1 ? setPrediction : setPrediction2;
    const setLoadingState = plantNumber === 1 ? setLoading : setLoading2;

    if (selectedImageState) {
      setLoadingState(true);

      const formData = new FormData();
      formData.append("file", {
        uri: selectedImageState,
        name: selectedImageNameState,
        type: "image/jpeg",
      });

      axios
        .post("http://13.211.149.213:8000/predict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(
            `Prediction Result for Plant ${plantNumber}:`,
            response.data
          );

          const class1 = response.data.class1;
          const confidence1 = response.data.confidence1;

          if (plantNumber === 1) {
            setPredictionState({ class1, confidence1 });
          } else if (plantNumber === 2) {
            setPrediction2({ class1, confidence1 });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoadingState(false);
        });
    } else {
      console.error(`Please select an image file for Plant ${plantNumber}`);
    }
  };

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
              onPress={() => pickImage(1)}
            >
              <Text style={styles.buttonText}>Select Image for Plant 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => pickImage(2)}
            >
              <Text style={styles.buttonText}>Select Image for Plant 2</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerText}>
            <Text style={styles.title}>Plant Images</Text>

            <View style={styles.horizontalImageContainer}>
              <View style={styles.imageWithLabel}>
                {selectedImage && (
                  <>
                    <Image
                      source={{ uri: selectedImage }}
                      style={{ width: 200, height: 200, marginTop: 20 }}
                    />
                    {/* {selectedImageName && (
                      <Text style={{ marginTop: 10 }}>
                        Selected Image Name: {selectedImageName}
                      </Text>
                    )} */}
                    <View style={styles.buttonContainer}>
                      {loading && (
                        <ActivityIndicator size="large" color="green" />
                      )}
                      <TouchableOpacity
                        style={[styles.button, { marginBottom: 10 }]}
                        onPress={() => handlePredictClick(1)}
                        disabled={loading}
                      >
                        <Text style={styles.buttonText}>Predict Image</Text>
                      </TouchableOpacity>

                      {prediction && (
                        <Text style={styles.description}>
                          {prediction.class1}{" "}
                          {prediction.confidence1.toFixed(2)}
                        </Text>
                      )}
                    </View>
                  </>
                )}
              </View>

              <View style={styles.imageWithLabel}>
                {selectedImage2 && (
                  <>
                    <Image
                      source={{ uri: selectedImage2 }}
                      style={{ width: 200, height: 200, marginTop: 20 }}
                    />
                    {/* {selectedImageName2 && (
                      <Text style={{ marginTop: 10 }}>
                        Selected Image Name: {selectedImageName2}
                      </Text>
                    )} */}
                    <View style={styles.buttonContainer}>
                      {loading2 && (
                        <ActivityIndicator size="large" color="green" />
                      )}
                      <TouchableOpacity
                        style={[styles.button, { marginBottom: 10 }]}
                        onPress={() => handlePredictClick(2)}
                        disabled={loading2}
                      >
                        <Text style={styles.buttonText}>Predict Image</Text>
                      </TouchableOpacity>

                      {prediction2 && (
                        <Text style={styles.description}>
                          {prediction2.class1}{" "}
                          {prediction2.confidence1.toFixed(2)}
                        </Text>
                      )}
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = {
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  clearButton: {
    color: "white",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  containerText: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(38, 166, 91, 0.4)",
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    minHeight: 450,
    minWidth: 450,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  horizontalImageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageWithLabel: {
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
  description: {
    color: "green",
    marginTop: 5,
    textAlign: "center",
  },
};
