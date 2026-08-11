import styled from 'styled-components/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

export default function AuthScreen({ navigation }: any) {
  return (
    <Container>
      <Text style={{fontSize: 18, fontWeight: '700'}}>Auth</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Passenger')} style={{marginTop:16}}>
        <Text style={{color: '#2563eb'}}>Sign in (mock)</Text>
      </TouchableOpacity>
    </Container>
  );
}
