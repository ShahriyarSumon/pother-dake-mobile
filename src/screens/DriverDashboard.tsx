import styled from 'styled-components/native';
import React from 'react';
import { Text } from 'react-native';
import Header from '../components/Header';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

export default function DriverDashboard({ navigation }: any) {
  return (
    <>
      <Header navigation={navigation} title="Driver" />
      <Container>
        <Text style={{fontSize: 18, fontWeight: '700'}}>Driver Dashboard</Text>
      </Container>
    </>
  );
}
