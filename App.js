import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Weather from './Weather';
import HomeScreen from './Home';
import Tabs from './TabBottom';
import LoginScreen from './Login';
import SignUpScreen from './Sign-up';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LinearGradient
        colors={['#089dc2', '#3291a8', '#9ba8ab', '#9ba8ab', '#9ba8ab']}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Stack.Navigator
            initialRouteName="Tabs"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name='home' component={HomeScreen}/>
          </Stack.Navigator>
        </View>
      </LinearGradient>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
