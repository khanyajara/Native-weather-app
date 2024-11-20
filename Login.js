import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in both fields');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return;
    }

    
    await AsyncStorage.setItem('email', email);

    console.log('Logged in with:', email, password);

    
    navigation.navigate('Weather');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a8a8a8"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a8a8a8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" style={styles.Button} onPress={handleLogin} color="#4CAF50" />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#121212', 
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    color: '#4CAF50', 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width:280,
    borderColor: '#4CAF50', 
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: 'white', 
  },
  link: {
    color: '#4CAF50',
    marginTop: 10,
    textAlign: 'center',
  },
  Button:{
    width:280,
  },
});

export default LoginScreen;