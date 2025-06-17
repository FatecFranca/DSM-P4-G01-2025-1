import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonRedirect from '../components/ButtonRedirect';
import LiveScreen from '../components/LiveScreen';

export default function HomeScreen({ navigation }: any) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) setUserName(name);
    };
    fetchUser();
  }, []);

  const openDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Bem-vindo ao Clima App!</Text>
        <LiveScreen navigation={navigation}></LiveScreen>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});
