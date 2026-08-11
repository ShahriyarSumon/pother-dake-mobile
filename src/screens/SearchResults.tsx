import styled from 'styled-components/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import mockData from '../services/mockData';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

const Item = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  background-color: #f8fafc;
  margin-bottom: 8px;
`;

export default function SearchResults({ navigation }: any) {
  return (
    <Container>
      <FlatList
        data={mockData.trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item onPress={() => navigation.navigate('TripDetails', { id: item.id })}>
            <Text style={{fontWeight: '600'}}>{item.title}</Text>
            <Text>{item.subtitle}</Text>
          </Item>
        )}
      />
    </Container>
  );
}
