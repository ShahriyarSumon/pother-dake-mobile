import styled from 'styled-components/native';
import React from 'react';
import { Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

export default function DriverDashboard() {
  return (
    <Container>
      <Text style={{fontSize: 18, fontWeight: '700'}}>Driver Dashboard</Text>
    </Container>
  );
}
