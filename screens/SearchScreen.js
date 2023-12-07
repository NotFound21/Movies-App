import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { searchMovies } from "../api/moviedb";
import { debounce } from "lodash";
import Loading from "../components/loading";
import { styles } from "../theme";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [number, setNumber] = useState(1);
  const [searchtext, setText] = useState("");

  const handleSearch = () => {
    if (searchtext && searchtext.length > 3) {
      // logs para verificar errores
      //console.log("Search triggered with:", searchtext);
      setLoading(true);
      searchMovies({
        s: searchtext,
        page: `${number}`,
      }).then((data) => {
        setLoading(false);
        if (data && data.Search) {
          //console.log("Search results:", data.Search);
          setResults(data.Search);
        } else {
          //console.log("No search results found.");
          setResults([]);
        }
      });
    } else {
      //console.log("Search text too short or empty:", searchtext); // Log for debugging
      setLoading(false);
      setResults([]);
    }
  };

  const handleSearchDebounced = useCallback(debounce(handleSearch, 400), [
    number,
  ]);
  const handlePagination = (newPage) => {
    setNumber(newPage);
    handleSearchDebounced();
  };

  useEffect(() => {
    const handleTextDebounce = debounce(handleSearch, 400);

    handleTextDebounce();

    return () => handleTextDebounce.cancel();
  }, [searchtext, number]);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* Input de busqueda */}
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={(text) => {
            setText(text);
            handleSearchDebounced();
          }}
          value={searchtext}
          placeholder="Busca Una Pelicula"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* resultados de la busqueda */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <View className="flex-row justify-between">
            <Text className="text-white font-semibold ml-1">
              Results ({results.length})
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                disabled={number === 1}
                onPress={() => handlePagination(number - 1)}
                style={styles.background}
                className="rounded-xl p-1"
              >
                <ChevronLeftIcon size="25" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
              <Text className="text-white text-base font-semibold ">
                {number}
              </Text>
              <TouchableOpacity
                onPress={() => handlePagination(number + 1)}
                style={styles.background}
                className="rounded-xl p-1"
              >
                <ChevronRightIcon size="25" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
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
