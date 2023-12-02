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
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";

const API_ENDPOINT = "http://3.27.222.103:8000/predict";

export default function PlantMatchPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImageName2, setSelectedImageName2] = useState(null);
  const [prediction2, setPrediction2] = useState(null);
  const [loading2, setLoading2] = useState(false);

  const [mixEnabled, setMixEnabled] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const classDescriptions = {
    "Aloe Vera": "Slow",
    Basil: "Aggressive",
    "Cabbage Succulent": "Slow",
    "Chinese Evergreen": "Slow",
    "Golden Pothos": "Aggressive",
    "Peace Lily": "Slow",
    "Rubber Tree": "Aggressive",
    "Snake Plant": "Slow",
    "Spider Plant": "Aggressive",
    "ZZ Plant": "Slow",
  };

  const pickImage = async (plantNumber) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
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

  const captureImage = async (plantNumber) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
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

  const handlePredictClick = async (plantNumber) => {
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

      try {
        const response = await axios.post(API_ENDPOINT, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const currentDate = new Date();
        console.log(
          `[${currentDate.toLocaleString()}] Prediction Result for Plant ${plantNumber}:`,
          response.data
        );

        const class1 = response.data.class1;
        const confidence1 = response.data.confidence1;
        const identification = classDescriptions[class1];

        if (plantNumber === 1) {
          setPredictionState({ class1, confidence1, identification });
        } else if (plantNumber === 2) {
          setPrediction2({ class1, confidence1, identification });
        }

        if (plantNumber === 1 && prediction2) {
          setMixEnabled(true);
        } else if (plantNumber === 2 && prediction) {
          setMixEnabled(true);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingState(false);
      }
    } else {
      console.error(`Please select an image file for Plant ${plantNumber}`);
    }
  };

  const removeImage = (plantNumber) => {
    if (plantNumber === 1) {
      setSelectedImage(null);
      setSelectedImageName(null);
      setPrediction(null);
    } else if (plantNumber === 2) {
      setSelectedImage2(null);
      setSelectedImageName2(null);
      setPrediction2(null);
    }

    setMixEnabled(false);
  };

  const handleMatchClick = () => {
    if (prediction && prediction2) {
      const identification1 = prediction.identification;
      const identification2 = prediction2.identification;

      let message = "";

      if (identification1 === identification2) {
        if (identification1 === "Slow") {
          message =
            "The two plants have the same growing habits, thus compatible to take care of at the same time.";
        } else if (identification1 === "Aggressive") {
          message =
            "The two plants have the same growing habits but not compatible due to possible crowding.";
        }
      } else {
        message =
          "The two plants have different growing habits, thus highly suggested to have enough space between them so they can both grow properly.";
      }

      setAlertMessage(message);
      setAlertVisible(true);
    } else {
      alert("Please predict images for both plants before matching.");
    }
  };

  const handleModalClose = () => {
    setAlertVisible(false);
    setAlertMessage("");
  };

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.buttonGroup}>
            <View style={styles.column}>
              <Text style={styles.columnText}>Plant 1</Text>
              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => pickImage(1)}
                disabled={loading}
              >
                <Icon
                  name="upload"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}> Upload Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => captureImage(1)}
                disabled={loading}
              >
                <Icon
                  name="camera"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}> Capture Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 20 }} />
            <View style={styles.column}>
              <Text style={styles.columnText}>Plant 2</Text>
              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => pickImage(2)}
                disabled={loading2}
              >
                <Icon
                  name="upload"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}> Upload Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => captureImage(2)}
                disabled={loading}
              >
                <Icon
                  name="camera"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}> Capture Photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerText}>
            <Text style={styles.title}>Plant Images</Text>

            <View style={styles.horizontalImageContainer}>
              <View style={styles.imageWithLabel}>
                {selectedImage && (
                  <>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeImage(1)}
                    >
                      <Icon
                        name="times"
                        size={20}
                        color="white"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, { marginBottom: 10 }]}
                        onPress={() => handlePredictClick(1)}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <>
                            <Icon
                              name="refresh"
                              size={20}
                              color="white"
                              style={styles.icon}
                            />
                            <Text style={styles.buttonText}>Predict Image</Text>
                          </>
                        )}
                      </TouchableOpacity>

                      {prediction && (
                        <>
                          <Text style={styles.label}>
                            {prediction.class1}
                            {"\n"} {"("}
                            {prediction.confidence1.toFixed(2)}
                            {"%)"}
                          </Text>
                          {prediction.identification && (
                            <Text style={styles.description}>
                              Growing Habit: {prediction.identification}
                            </Text>
                          )}
                        </>
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
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeImage(2)}
                    >
                      <Icon
                        name="times"
                        size={20}
                        color="white"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, { marginBottom: 10 }]}
                        onPress={() => handlePredictClick(2)}
                        disabled={loading2}
                      >
                        {loading2 ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <>
                            <Icon
                              name="refresh"
                              size={20}
                              color="white"
                              style={styles.icon}
                            />
                            <Text style={styles.buttonText}>Predict Image</Text>
                          </>
                        )}
                      </TouchableOpacity>

                      {prediction2 && (
                        <>
                          <Text style={styles.label}>
                            {prediction2.class1}
                            {"\n"} {"("}
                            {prediction2.confidence1.toFixed(2)}
                            {"%)"}
                          </Text>
                          {prediction2.identification && (
                            <Text style={styles.description}>
                              Growing Habit:{prediction2.identification}
                            </Text>
                          )}
                        </>
                      )}
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              marginTop: 20,
              backgroundColor: mixEnabled ? "green" : "lightgrey",
            },
          ]}
          onPress={handleMatchClick}
          disabled={!mixEnabled}
        >
          <Icon name="random" size={20} color="white" />
        </TouchableOpacity>

        <Modal isVisible={alertVisible} onBackdropPress={handleModalClose}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>MATCH PREDICTION RESULT</Text>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <TouchableOpacity
              onPress={handleModalClose}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    marginTop: 0,
    alignItems: "center",
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 0,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  column: {
    alignItems: "center",
  },
  columnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  selectedImage: {
    justifyContent: "flex-start",
    width: 200,
    height: 200,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "green",
  },
  containerText: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(38, 166, 91, 0.4)",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
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
    flex: 1,
    height: 350,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "green",
    marginTop: 5,
    textAlign: "center",
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: -10,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 50,
    zIndex: 1,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
};
