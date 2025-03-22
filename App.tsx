import React from "react";
import { SafeAreaView } from "react-native";
import RecipeFinder from "./screens/RecipeFinder";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RecipeFinder />
    </SafeAreaView>
  );
};

export default App;
