import styled from 'styled-components/native';
import React from 'react';
import { View, Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.primary};
`;

export default function LandingScreen({ navigation }: any) {
  return (
    <Container>
      <Title>Landing Page</Title>
      <Text onPress={() => navigation.navigate('Search')} style={{color: '#2563eb', marginTop: 12}}>Go to Search</Text>
    </Container>
  );
}
