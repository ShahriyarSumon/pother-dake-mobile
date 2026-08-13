import styled from 'styled-components/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import Header from '../components/Header';
import api from '../api';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

const Field = styled.TextInput`
  border-width: 1px;
  border-color: #e5e7eb;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #fff;
`;

const Button = styled.TouchableOpacity`
  background-color: #2563eb;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: 700;
`;

export default function AuthScreen({ navigation }: any) {
  const [email, setEmail] = useState('sharearsumon5@gmail.com');
  const [password, setPassword] = useState('123@sumonE');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      const res = await api.login(email.trim(), password);
      setLoading(false);
      Alert.alert('Success', 'Logged in successfully');
      // navigate into passenger area by default — token is stored by api.login
      navigation.navigate('Passenger');
    } catch (err: any) {
      setLoading(false);
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      Alert.alert('Login error', String(msg));
    }
  };

  return (
    <>
      <Header navigation={navigation} title="Auth" />
      <Container>
        <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 12}}>Sign in</Text>
        <Field placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Field placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{marginTop: 12}} />
        ) : (
          <Button onPress={onLogin}>
            <ButtonText>Sign In</ButtonText>
          </Button>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={{marginTop: 12}}>
          <Text style={{color: '#2563eb'}}>Back to Home</Text>
        </TouchableOpacity>
      </Container>
    </>
  );
}
