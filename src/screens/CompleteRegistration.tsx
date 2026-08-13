import styled from 'styled-components/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import Header from '../components/Header';
import * as DocumentPicker from 'expo-document-picker';
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
  margin-bottom: 12px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: 700;
`;

export default function CompleteRegistration({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [gender, setGender] = useState('');
  const [nidNo, setNidNo] = useState('');
  const [profession, setProfession] = useState('');
  const [nidFront, setNidFront] = useState<any>(null);
  const [nidBack, setNidBack] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickFile = async (setter: any) => {
    const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (res.type === 'success') setter(res);
  };

  const onSubmit = async () => {
    if (!email || !otpCode) return Alert.alert('Error', 'Email and OTP required');
    const formData: any = new FormData();
    formData.append('email', email);
    formData.append('otpCode', otpCode);
    formData.append('gender', gender);
    formData.append('nidNo', nidNo);
    formData.append('profession', profession);

    if (nidFront && nidFront.uri) {
      formData.append('nidFront', {
        uri: nidFront.uri,
        name: nidFront.name || 'nidFront.jpg',
        type: nidFront.mimeType || 'image/jpeg'
      });
    }
    if (nidBack && nidBack.uri) {
      formData.append('nidBack', {
        uri: nidBack.uri,
        name: nidBack.name || 'nidBack.jpg',
        type: nidBack.mimeType || 'image/jpeg'
      });
    }

    try {
      setLoading(true);
      await api.completeRegistration(formData);
      setLoading(false);
      Alert.alert('Success', 'Registration completed.');
      navigation.navigate('Landing');
    } catch (err: any) {
      setLoading(false);
      const msg = err?.response?.data?.message || err?.message || 'Upload failed';
      Alert.alert('Error', String(msg));
    }
  };

  return (
    <>
      <Header navigation={navigation} title="Complete Registration" />
      <Container>
        <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 12}}>Complete your registration</Text>
        <Field placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Field placeholder="OTP code" value={otpCode} onChangeText={setOtpCode} />
        <Field placeholder="Gender" value={gender} onChangeText={setGender} />
        <Field placeholder="NID number" value={nidNo} onChangeText={setNidNo} />
        <Field placeholder="Profession" value={profession} onChangeText={setProfession} />

        <Button onPress={() => pickFile(setNidFront)}>
          <ButtonText>{nidFront ? `Selected: ${nidFront.name}` : 'Pick NID Front'}</ButtonText>
        </Button>
        <Button onPress={() => pickFile(setNidBack)}>
          <ButtonText>{nidBack ? `Selected: ${nidBack.name}` : 'Pick NID Back'}</ButtonText>
        </Button>

        {loading ? <ActivityIndicator size="large" color="#2563eb" /> : (
          <Button onPress={onSubmit}>
            <ButtonText>Submit</ButtonText>
          </Button>
        )}
      </Container>
    </>
  );
}
