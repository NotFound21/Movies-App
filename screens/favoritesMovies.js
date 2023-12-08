import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { searchMovies } from "../api/moviedb";
import { debounce } from "lodash";
import Loading from "../components/loading";
import { styles } from "../theme";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";

const { width, height } = Dimensions.get("window");

export default function FavoriteMovies() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(item){
      setLoading(false)
    }

  }, []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* Input de busqueda
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={(text) => {
            setText(text);
            handleSearchDebounced();
          }}
          value={searchtext}
          placeholder={
            isAdvancedSearch ? "Ingresa titulo" : "Busca Una Pelicula"
          }
          placeholderTextColor={"lightgray"}
          className="pb-1 p-4 pl-6 flex-1 text-justify font-semibold text-white tracking-wider"
        /> */}

        {/* {
          <TouchableOpacity
            onPress={() =>
              setIsAdvancedSearch(
                !isAdvancedSearch,
                setMovieType(""),
                setReleaseYear("")
              )
            }
            className="rounded-full p-3 m-1 bg-neutral-500"
          >
            <Text style={{ color: "white" }}>
              {isAdvancedSearch ? "Simple" : "Advanced"}
            </Text>
          </TouchableOpacity>
        } */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className=" items-center  rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="19" color="white" />
        </TouchableOpacity>
      </View> */}

      {/* resultados de la busqueda */}
      {loading ? (
        <Loading />
      ) : item.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <View className="flex-row justify-between">
            <Text className="text-white font-semibold ml-1">
              Resultados ({item.length})
            </Text>
          </View>
          <View className="flex-row justify-between flex-wrap">
            {item.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item.imdbID)}
                >
                  <View className="space-y-2 mb-5">
                    <Image
                      source={{
                        uri:
                          item.Poster ||
                          require("../assets/images/movieTime.png"),
                      }}
                      // source={require('../assets/images/moviePoster2.png')}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.4 }}
                    />
                    <Text className="text-gray-300 ml-1">
                      {item.Title.length > 22
                        ? item.Title.slice(0, 22) + "..."
                        : item.Title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
