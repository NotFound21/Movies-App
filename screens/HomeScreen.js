import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import CarouselMovies from "../components/carouselMovies";
import MovieList from "../components/movieList";
import { popularMovies, releasesMovies } from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import FavoriteList from "../components/favoriteList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-9";
export default function HomeScreen() {
  const [carousel, setCarousel] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isactive, setisActive] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [Loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    getMovies();
    getPopular();
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getFavorite();
    });
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const getFavorite = async () => {
    setLoading(true);
    try {
      let favorites = await AsyncStorage.getItem("favoriteMovies");
      if (!favorites) {
        favorites = [];
      } else {
        favorites = JSON.parse(favorites);
        setFavorites(favorites);
        //console.log(favorites);
      }
    } catch (error) {
      console.error("Error en favoritas:", error);
    }
  };

  const getMovies = async () => {
    const data = await releasesMovies();
    if (data && data.Search) setMovieList(data.Search);
    setLoading(false);
  };
  const getPopular = async () => {
    const data = await popularMovies({
      s: "saw",
      page: "1",
    });
    if (data && data.Search) setCarousel(data.Search);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView
        className={ios ? "-mb-2 mt-9" : "mb-4"}
        style={{ marginTop: 10 }}
      >
        <StatusBar style="light" />
        <View
          className={"flex-row justify-between items-center mx-5" + topMargin}
        >
          {isactive ? (
            <View className="mx-1 flex-1 justify-between  items-center border border-neutral-500 rounded-full">
              <TextInput
                placeholder="Busca una pelicula"
                placeholderTextColor={"lightgray"}
                className="pb-3 pt-2 pl-4 w-full text-base font-semibold text-white tracking-wider"
              />
            </View>
          ) : (
            <Text className="text-white text-2xl font-bold">
              <Text style={styles.text}>P</Text>eliculas
            </Text>
          )}

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={3} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Se realiza carousel para las peliculas */}
        {isLoading ? (
          <Text className="mx-10 text-neutral-400 font-semibold text-center">
            Comienza Buscando Tu Pelicula Favorita
          </Text>
        ) : (
          <CarouselMovies data={carousel} />
        )}

        {/* Componente para listar las peliculas por estrenar */}
        <MovieList title="Estrenos" data={movieList} />
        {/* Componente para mostrar las peliculas mas puntuadas */}
        <FavoriteList title="Mis Favoritas" data={favorites} />
      </ScrollView>
    </View>
  );
}
