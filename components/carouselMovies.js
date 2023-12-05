import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import {useNavigation} from '@react-navigation/native'

// Utilizamos variables globales dentro del archivo width y height para adaptar a pantalla

var { width, height } = Dimensions.get("window");
export default function CarouselMovies({ data }) {
  const navigation =  useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  }
  return (
    <View className="mb-2">
      <Text className="text-white text-xl mx-4 mb-5">Resultados</Text>
      <Carousel
        renderItem={({ item }) => <MovieCard item={item} handleClick={()=>handleClick(item)} />}
        data={data}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={require('../assets/images/imagesPoster1.jpg')}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
