import styled from 'styled-components/native';
import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

export default function TripDetails({ route, navigation }: any) {
  const id = route?.params?.id;
  return (
    <>
      <Header navigation={navigation} title="Trip Details" />
      <Container>
        <Text style={{fontSize: 18, fontWeight: '700'}}>Trip Details</Text>
        <Text style={{marginTop: 8}}>Trip id: {id}</Text>
      </Container>
    </>
  );
}
