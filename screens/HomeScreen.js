import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

export default function HomeScreen() {
  const [carousel, setCarousel] = useState([1,2,3])
  const [movieList, setMovieList] = useState([1,2,3])
  const [topRated, setTopRated] = useState([1,2,3])


  return (
    <View className="flex-1 bg-neutral-900 mt-8">
      <SafeAreaView
        className={ios ? "-mb-2" : "mb-3"}
        style={{ marginTop: 10 }}
      >
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-5">
            {/* se invoca icono desde la libreria heroicons */}
          <Bars3CenterLeftIcon size="30" strokeWidth={3} color="white" />
          <Text className="text-white text-2xl font-bold">
            <Text style={styles.text}>P</Text>eliculas
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={3} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:10}}>
        {/* Se realiza carousel para las peliculas */}
        <CarouselMovies data={carousel}/>
        {/* Componente para listar las peliculas por estrenar */}
        <MovieList title="Estrenos" data={movieList}/>
        
      </ScrollView>
    </View>
  );
}
("");
