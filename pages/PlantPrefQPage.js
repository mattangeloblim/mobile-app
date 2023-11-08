import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
// import Navbar from "../component/Navbar";

const PlantPrefQPage = () => {
  const navigation = useNavigation();
  const [yesQ1Checked, setYesQ1Checked] = useState(false);
  const [noQ1Checked, setNoQ1Checked] = useState(false);
  const [yesQ2Checked, setYesQ2Checked] = useState(false);
  const [noQ2Checked, setNoQ2Checked] = useState(false);

  const [yesQ3Checked, setYesQ3Checked] = useState(false);
  const [noQ3Checked, setNoQ3Checked] = useState(false);
  const [yesQ4Checked, setYesQ4Checked] = useState(false);
  const [noQ4Checked, setNoQ4Checked] = useState(false);

  const [flowers, setFlowers] = useState([]);


  const sendPreferences = async () => {
    const requestBody = {
      question1: yesQ1Checked ? 1 : 0,
      question2: yesQ2Checked ? 1 : 0,
      question3: yesQ3Checked ? 1 : 0,
      question4: yesQ4Checked ? 1 : 0,
    };

    try {
      const response = await fetch("http://54.206.87.142:9001/api/preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      // Use the responseData as needed
      // console.log('Response:', responseData);
      // const plantNames = responseData.matchingFlower.map(flower => flower.name)
      // const plantDescription = responseData.matchingFlower.map(flower => flower.description)
      // const plantPath = responseData.matchingFlower.map(flower => flower.name)

      // console.log(plantNames);
      // console.log(plantDescription);
      // console.log(plantPath)
      const flowerData = responseData.matchingFlower.map(flower => {
        return {
          name: flower.name,
          description: flower.description,
          imagePath: flower.imagePath
        };
      });

      // console.log(flowerData)
  
      setFlowers(flowerData);

      console.log(flowers)

      navigation.navigate('PlantPreferencePage', { flowers: flowerData });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [nextPage, setNextPage] = useState(false);

  const isBothQuestionsAnswered =
    (yesQ1Checked || noQ1Checked) && (yesQ2Checked || noQ2Checked);

  const isAllAnswered =
    (yesQ1Checked || noQ1Checked) &&
    (yesQ2Checked || noQ2Checked) &&
    (yesQ3Checked || noQ3Checked) &&
    (yesQ4Checked || noQ4Checked);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/questionBg.png")}
        style={styles.backgroundImage}
      />
      {!nextPage && (
        <View>
          <View style={styles.centeredContainer}>
            <View style={styles.mainView}>
              <View style={styles.subView}>
                <Text style={styles.textSubView}>About your space</Text>
              </View>
              <Text style={styles.mainViewText}>
                Does your indoor space get enough sunlight?
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  yesQ1Checked && styles.checkedCheckbox,
                  yesQ1Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ1Checked(true);
                  setNoQ1Checked(false);
                }}
              >
                <Text style={styles.checkboxText}>
                  {yesQ1Checked ? "✓" : ""} Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  noQ1Checked && styles.checkedCheckbox,
                  noQ1Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ1Checked(false);
                  setNoQ1Checked(true);
                }}
              >
                <Text style={styles.checkboxText}>
                  {noQ1Checked ? "✓" : ""} No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centeredContainer}>
            <View style={styles.mainView}>
              <Text style={styles.mainViewText}>
                Is your indoor space properly ventilated?
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  yesQ2Checked && styles.checkedCheckbox,
                  yesQ2Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ2Checked(true);
                  setNoQ2Checked(false);
                }}
              >
                <Text style={styles.checkboxText}>
                  {yesQ2Checked ? "✓" : ""} Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  noQ2Checked && styles.checkedCheckbox,
                  noQ2Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ2Checked(false);
                  setNoQ2Checked(true);
                }}
              >
                <Text style={styles.checkboxText}>
                  {noQ2Checked ? "✓" : ""} No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setNextPage(true);
            }}
          >
            {isBothQuestionsAnswered && (
              <View style={styles.button}>
                <Text style={styles.buttonText}>Next {">>"}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
      {nextPage && (
        <View>
          <View style={styles.centeredContainer}>
            <View style={styles.mainView}>
              <View style={styles.subView}>
                <Text style={styles.textSubView}>About your preference</Text>
              </View>
              <Text style={styles.mainViewText}>
                Do you prefer an indoor plant that needs to be watered
                frequently?
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  yesQ3Checked && styles.checkedCheckbox,
                  yesQ3Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ3Checked(true);
                  setNoQ3Checked(false);
                }}
              >
                <Text style={styles.checkboxText}>
                  {yesQ1Checked ? "✓" : ""} Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  noQ3Checked && styles.checkedCheckbox,
                  noQ3Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ3Checked(false);
                  setNoQ3Checked(true);
                }}
              >
                <Text style={styles.checkboxText}>
                  {noQ1Checked ? "✓" : ""} No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centeredContainer}>
            <View style={styles.mainView}>
              <Text style={styles.mainViewText}>
                Do you prefer a flower-bearing plant?
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  yesQ4Checked && styles.checkedCheckbox,
                  yesQ4Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ4Checked(true);
                  setNoQ4Checked(false);
                }}
              >
                <Text style={styles.checkboxText}>
                  {yesQ2Checked ? "✓" : ""} Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  noQ4Checked && styles.checkedCheckbox,
                  noQ4Checked && { backgroundColor: "#698B59" },
                ]}
                onPress={() => {
                  setYesQ4Checked(false);
                  setNoQ4Checked(true);
                }}
              >
                <Text style={styles.checkboxText}>
                  {noQ4Checked ? "✓" : ""} No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {isBothQuestionsAnswered && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setNextPage(false);
                }}
              >
                <Text style={styles.buttonText}>{"<< "}Back </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {isAllAnswered && (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={sendPreferences}>
                  Submit{" "}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
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
  centeredContainer: {
    width: "80%",
    marginTop: 120,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  mainView: {
    width: "100%",
    height: 90,
    backgroundColor: "#698B59",
    marginBottom: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  subView: {
    marginRight: "48%",
    backgroundColor: "#CAE1CD",
    width: 150,
  },
  textSubView: {
    padding: 4,
    color: "#385B4F",
  },
  mainViewText: {
    color: "white",
    textAlign: "justify",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  checkbox: {
    backgroundColor: "#9FB694",
    width: "30%",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  checkedCheckbox: {
    backgroundColor: "#698B59",
  },
  checkboxText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: -100,
    right: 40,
  },
  button: {
    backgroundColor: "#9FB694",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#667538",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PlantPrefQPage;
