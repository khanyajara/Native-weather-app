import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Weather from './Weather';
import HomeScreen from './Home'
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

export default function App() {


  return (
    <View style={styles.container}>
        <LinearGradient
           colors={['#089dc2', '#3291a8','#9ba8ab','#9ba8ab','#9ba8ab']}
           start={{ x: 0, y: 0 }}
             end={{ x: 2, y: 1 }}
           style={styles.gradient}
           ><HomeScreen /> 
      
    </LinearGradient>
      
      
    </View>
  );
}


