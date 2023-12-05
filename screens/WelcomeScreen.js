import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-2";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  useEffect(() => {}, []);
  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={{width:width, height:height}}>
      <View className="flex-1 justify-center content-center">
        <SafeAreaView
          className={"w-full flex-row px-4 justify-center" + topMargin}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View
              className={
                "bg-yellow-500 hover:bg-purple-400 py-2 px-8 rounded-full"
              }
            >
              <Text className="text-white font-bold">Ingresar</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
