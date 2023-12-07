import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppState } from "./AppStateContext";

const LoadingScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useAppState();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: false });

      navigation.replace("Welcome");
    }, 2000);
  }, [dispatch, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
