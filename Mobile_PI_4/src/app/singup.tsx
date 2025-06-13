import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { signup } from '../services/auth';
import ButtonLogin from '../components/ButtonLogin';
import ButtonSignup from '../components/ButtonSignup';

export default function SignupScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSignup = async () => {
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setErro('');
    try {
      const data = await signup(user, email, senha, confirmarSenha);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao cadastrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Como gostaria de ser chamado?</Text>
        <TextInput
          value={user}
          onChangeText={setUser}
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Qual o seu melhor e-mail?</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          placeholder="Digite a senha"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Confirmação de senha</Text>
        <TextInput
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          style={styles.input}
          placeholder="Confirme a senha"
          placeholderTextColor="#ccc"
        />

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <ButtonSignup onPress={handleSignup} />
            <ButtonLogin onPress={() => navigation.goBack()} />
          </>
        )}
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
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
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
  },
});
