import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground, StyleSheet } from 'react-native';
import LoginScreen from './src/app/login';
import SignupScreen from './src/app/singup';
import HomeScreeen from './src/app/home';
import DashboardScreen from './src/components/DashboardScreen';
import LiveScreen from './src/components/LiveScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreeen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Live" component={LiveScreen}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
