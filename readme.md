# Foobar

Este proyecto es para una evaluacion de trabajo 

## Installation

Debemos clonar el proyecto y luego instalar todas las dependencias de Package.json
```bash

npm install
```
pendiente de documentar mas pasos

dependencias utilizadas: 
{
    "@expo/webpack-config": "^19.0.0",
    "@react-native-async-storage/async-storage": "1.18.2",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "axios": "^1.6.2",
    "deprecated-react-native-prop-types": "^5.0.0",
    "expo": "^49.0.0",
    "expo-linear-gradient": "~12.3.0",
    "expo-status-bar": "~1.6.0",
    "nativewind": "^2.0.11",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.72.6",
    "react-native-gesture-handler": "~2.12.0",
    "react-native-heroicons": "^3.2.0",
    "react-native-progress": "^5.0.1",
    "react-native-share": "^10.0.2",
    "react-native-snap-carousel": "^3.9.1",
    "react-native-splash-screen": "^3.3.0",
    "react-native-svg": "^13.9.0",
    "react-native-web": "~0.19.6",
    "rn-overlay": "^0.4.0",
    "tailwind-rn": "^4.2.0"
  },
## Posible Errores
ir a: 
nodeModules/react-native/index.js
modificar: 
```bash

  get ViewPropTypes(): $FlowFixMe {
    console.error(
      'ViewPropTypes will be removed from React Native, along with all ' +
        'other PropTypes. We recommend that you migrate away from PropTypes ' +
        'and switch to a type system like TypeScript. If you need to ' +
        'continue using ViewPropTypes, migrate to the ' +
        "'deprecated-react-native-prop-types' package.",
    );
    return require('deprecated-react-native-prop-types').ViewPropTypes;
  },
```
a esto:
```bash

  get ViewPropTypes(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').ViewPropTypes;
  },
```
Se utiliza react-native 0.72.6 debido a su version estable en relacion a las dependencias de las librerias
![Se utiliza react-native 0.72.6 debido a su version estable en relacion a las dependencias de las librerias](https://github.com/NotFound21/Movies-App/blob/master/assets/images/react-native.png?raw=true)
