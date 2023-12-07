import {
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { movieDetails } from "../api/moviedb";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  //console.log(item);
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [genre, setGenre] = useState([]);

  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favoriteMovies");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];
      //console.log(parsedFavorites);
      const isFav = parsedFavorites.some((fav) => fav.imdbID === movie.imdbID);
      toggleFavourite(isFav);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };
  useEffect(() => {
    getMovieDetails();
  }, [item]);

  useEffect(() => {
    checkIfFavorite();
  }, [movie]);

  const toggleFavorite = async () => {
    try {
      let favorites = await AsyncStorage.getItem("favoriteMovies");
      if (!favorites) {
        favorites = [];
      } else {
        favorites = JSON.parse(favorites);
      }
      const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
      if (isFav) {
        const updatedFavorites = favorites.filter(
          (fav) => fav.imdbID !== movie.imdbID
        );
        toggleFavourite(false);
        await AsyncStorage.setItem(
          "favoriteMovies",
          JSON.stringify(updatedFavorites)
        );
      } else {
        // Add to favorites
        favorites.push(movie);
        toggleFavourite(true);
        await AsyncStorage.setItem("favoriteMovies", JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const getMovieDetails = async () => {
    setLoading(true);
    //console.log(item);
    const data = await movieDetails({
      i: item,
      plot: "full",
    });
    //console.log("Actors: ", data);
    if (data) setMovie(data);
    setCast(data.Actors);
    setGenre(data.Genre);
    setLoading(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="25" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite()}>
            <HeartIcon size="35" color={isFavourite ? "red" : "black"} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: movie.Poster }}
              style={{ width, height: height * 0.7 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie.Title}
        </Text>

        {/* Fecha de lanzamiento */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Estrenada • {movie.DVD ? movie.DVD : movie.Year} • {movie.Runtime}
        </Text>
        {/* Genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {genre.toString().split(",")[0]} •
          </Text>
          <Text className="text-neutral-400 font-sremibold text-base text-center">
            {genre.toString().split(",")[1]} •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {genre.toString().split(",")[2]}
          </Text>
        </View>
        {/* Descripciones de la pelicula si esque tiene */}
        <Text className="text-neutral-400 text-justify mx-4 tracking-wide">
          {movie.Plot}
        </Text>
      </View>

      {/* Cast */}
      <Cast navigation={navigation} cast={cast.toString().split(",")} />

      {/* Similar movies */}
      {/* <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        /> */}
    </ScrollView>
  );
}
