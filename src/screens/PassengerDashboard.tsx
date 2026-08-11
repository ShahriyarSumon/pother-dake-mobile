import styled from 'styled-components/native';
import React from 'react';
import { Text } from 'react-native';
import Header from '../components/Header';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

export default function PassengerDashboard({ navigation }: any) {
  return (
    <>
      <Header navigation={navigation} title="Passenger" />
      <Container>
        <Text style={{fontSize: 18, fontWeight: '700'}}>Passenger Dashboard</Text>
      </Container>
    </>
  );
}
