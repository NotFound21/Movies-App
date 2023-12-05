import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
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
const topMargin = ios ? "" : " mt-10";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  let movieName = "Spiderman 4";
  useEffect(() => {
    //Lo usamos para llamar a la API o para cualquier ejecucion que se necesite ejecutar al cargar la pagina
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            " absolute w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="z-10 rounded-xl p-1"
          >
            <ChevronLeftIcon size="26" strokeWidth={3} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleFavourite(!isFavourite)}
            className="z-10"
          >
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("../assets/images/imagesPoster2.png")}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,10)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {/* Detalles de las peliculas */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movieName}
        </Text>
        {/* El estado, el release, etc */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Muy Pronto • 2024 • 170 min
        </Text>
        {/* Generos de la pelicula */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        {/* Descripcion de pelicula */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          El final de 'Spider-Man: No Way Home' podría darnos a entender un
          cierre de franquicia. El Peter Parker de Tom Holland se independiza
          del MCU y los Vengadores y comienza una vida como justiciero en
          solitario. Su futuro nos lo podemos imaginar como lo hacemos con la de
          sus compañeros de multiverso, los Peter Parker de Tobey Maguire y
          Andrew Garfield. Sin embargo, hay varias cosas que se quedan
          pendientes. Para empezar, la aparición de Daredevil, por no hablar de
          la llegada de Kingpin a 'Ojo de halcón' y, por tanto, al crimen de
          Nueva York, territorio de Spider-Man.
        </Text>
      </View>
      {/* Parte de el elenco */}
      <Cast navigation={navigation} cast={cast} />
    </ScrollView>
  );
}
