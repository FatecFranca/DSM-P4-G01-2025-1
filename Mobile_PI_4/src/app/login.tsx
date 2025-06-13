import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import ButtonLogin from '../components/ButtonLogin';
import ButtonSignup from '../components/ButtonSignup';
import { login } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setErro('');
    try {
      const data = await login(email, senha);

      if (data.token) {
        // await AsyncStorage.setItem('user', data.user); 
        navigation.navigate('Home');
      } else {
        setErro('Resposta inesperada da API');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#ccc"
          />

          {erro ? <Text style={styles.error}>{erro}</Text> : null}

          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <ButtonLogin onPress={handleLogin} disabled={!email || !senha} />
              <ButtonSignup onPress={() => navigation.navigate('Signup')} />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    padding: 20,
  },
  label: {
    color: 'white',
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});
