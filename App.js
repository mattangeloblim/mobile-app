import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./component/HomeScreen";
import PlantPrefPage from "./pages/PlantPrefPage";
import PlantPrefQPage from "./pages/PlantPrefQPage";
import PlantMatchPage from "./pages/PlantMatchPage";
import PlantPreferencePage from "./pages/PlantPreferencePage";
import FlowerDetails from "./pages/FlowerDetailsPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlantPrefPage"
          component={PlantPrefPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlantPrefQPage"
          component={PlantPrefQPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlantMatchPage"
          component={PlantMatchPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlantPreferencePage"
          component={PlantPreferencePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FlowerDetails"
          component={FlowerDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
