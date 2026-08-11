import styled from 'styled-components/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Card from '../components/ui/Card';
import ChartPlaceholder from '../components/ui/ChartPlaceholder';
import mockData from '../services/mockData';

const Container = styled.View`
  flex: 1;
  background-color: ${p => p.theme.colors.background};
`;

const Content = styled.ScrollView`
  padding: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const RequestItem = styled.View`
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 8px;
`;

export default function DriverDashboard({ navigation }: any) {
  return (
    <>
      <Header navigation={navigation} title="Driver" />
      <Container>
        <Content>
          <SectionTitle>Earnings</SectionTitle>
          <Card>
            <Text style={{fontSize: 18, fontWeight: '700'}}>৳ 12,480</Text>
            <Text style={{color: '#6b7280', marginTop: 6}}>This month</Text>
          </Card>

          <SectionTitle style={{marginTop: 16}}>Live Requests</SectionTitle>
          <FlatList
            data={mockData.trips}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <RequestItem>
                <Text style={{fontWeight: '700'}}>{item.title}</Text>
                <Text style={{color: '#6b7280', marginTop: 6}}>{item.subtitle}</Text>
                <Text style={{color: '#2563eb', marginTop: 8}}>Accept</Text>
              </RequestItem>
            )}
          />

          <SectionTitle style={{marginTop: 16}}>Performance</SectionTitle>
          <Card>
            <ChartPlaceholder title="Trips / Week" />
          </Card>
        </Content>
      </Container>
    </>
  );
}
