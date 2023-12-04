import { StatusBar } from 'expo-status-bar';
//importamos desde node_modules las librerias necesarias (Ignacio Medel)
import * as React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import "rn-overlay";

export default function Main() {

  return <AppRouter />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlignVertical: "center",
    fontSize: 48,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
