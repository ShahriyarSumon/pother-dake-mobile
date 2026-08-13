import styled from 'styled-components/native';
import React from 'react';
import { Text } from 'react-native';
import Header from '../components/Header';
import RoleGuard from '../components/RoleGuard';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

function DriverDashboardInner() {
  return (
    <>
      <Header navigation={{}} title="Driver" />
      <Container>
        <Text style={{fontSize: 18, fontWeight: '700'}}>Driver Dashboard</Text>
      </Container>
    </>
  );
}

export default RoleGuard(['DRIVER'], DriverDashboardInner);
