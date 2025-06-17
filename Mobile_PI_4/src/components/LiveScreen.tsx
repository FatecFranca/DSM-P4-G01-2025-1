import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { getTemp } from '../services/auth';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';

import ButtonRedirect from './ButtonRedirect';

interface TempData {
  data: string;
  hora: string;
  temperatura: string;
  umidade: string;
}

export default function LiveScreen({ navigation }: any) {
  const [data, setData] = useState<TempData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getTemp();
      console.log('Resposta da API:', response);
      setData(response);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };



  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Atualiza a cada 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <ImageBackground
        source={require('../../assets/background.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4da6ff" />
          <Text style={styles.loadingText}>Carregando dados em tempo real...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Monitoramento em Tempo Real</Text>

        <View style={styles.card}>
          <FontAwesome5 name="calendar-alt" size={24} color="#fff" />
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>{data?.data}</Text>
        </View>

        <View style={styles.card}>
          <Feather name="clock" size={24} color="#fff" />
          <Text style={styles.label}>Horário</Text>
          <Text style={styles.value}>{data?.hora}</Text>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons name="thermometer" size={24} color="#fff" />
          <Text style={styles.label}>Temperatura</Text>
          <Text style={styles.value}>{data?.temperatura}</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="water" size={24} color="#fff" />
          <Text style={styles.label}>Umidade</Text>
          <Text style={styles.value}>{data?.umidade}</Text>
        </View>

        <View style={styles.status}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Sistema Online</Text>
        </View>
          <ButtonRedirect onPress={() => navigation.navigate('Dashboard')} />
      </ScrollView>
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
    padding: 16,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff20',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '90%',
    marginBottom: 16,
    borderColor: '#ffffff50',
    borderWidth: 1,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '600',
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#ffffff20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    backgroundColor: '#00ff00',
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
  },
});
