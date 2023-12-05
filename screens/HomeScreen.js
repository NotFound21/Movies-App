import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import CarouselMovies from "../components/carouselMovies";
import MovieList from "../components/movieList";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-9";
export default function HomeScreen() {
  const [carousel, setCarousel] = useState([1, 2, 3]);
  const [movieList, setMovieList] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [isactive, setisActive] = useState(false);
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
            <View className="mx-1 flex-row justify-between items-center border border-neutral-500 rounded-full">
              <TextInput
                placeholder="Busca una pelicula"
                placeholderTextColor={"lightgray"}
                className="pb-1 pl-2 flex-1 text-base font-semibold text-white tracking-wider"
              />
            </View>
          ) : (
            <Text className="text-white text-2xl font-bold">
              <Text style={styles.text}>P</Text>eliculas
            </Text>
          )}

          <TouchableOpacity onPress={()=>setisActive(!isactive)}>
            <MagnifyingGlassIcon size="30" strokeWidth={3} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Se realiza carousel para las peliculas */}
        <CarouselMovies data={carousel} />
        {/* Componente para listar las peliculas por estrenar */}
        <MovieList title="Estrenos" data={movieList} />
        {/* Componente para mostrar las peliculas mas puntuadas */}
        {/* <MovieList title="Mejores Puntuadas" data={topRated} /> */}
      </ScrollView>
    </View>
  );
}
("");
