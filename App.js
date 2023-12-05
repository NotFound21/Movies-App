import { StatusBar } from 'expo-status-bar';
//importamos desde node_modules las librerias necesarias (Ignacio Medel)
import * as React from "react";
import {
  Alert,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import "rn-overlay";
import AppNavigation from './Navigation/appNavigation';

export default function App() {

  return <AppNavigation />;
}

