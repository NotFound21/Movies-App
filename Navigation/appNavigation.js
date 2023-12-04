import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" Options={{headerShown: false}} component={Homescreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}