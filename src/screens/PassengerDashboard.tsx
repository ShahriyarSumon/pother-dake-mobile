import styled from 'styled-components/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import StatCard from '../components/ui/StatCard';
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

const TripItem = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default function PassengerDashboard({ navigation }: any) {
  return (
    <>
      <Header navigation={navigation} title="Passenger" />
      <Container>
        <Content>
          <SectionTitle>Overview</SectionTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 12}}>
            <StatCard label="Total Rides" value={mockData.stats.totalRides} />
            <StatCard label="Today" value={mockData.stats.todayRides} />
            <StatCard label="Revenue Today" value={mockData.stats.revenueToday} />
          </ScrollView>

          <SectionTitle>Activity</SectionTitle>
          <Card>
            <ChartPlaceholder title="Rides (last 7 days)" />
          </Card>

          <SectionTitle style={{marginTop: 16}}>Your Upcoming / Recent Trips</SectionTitle>
          <FlatList
            data={mockData.trips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TripItem onPress={() => navigation.navigate('TripDetails', { id: item.id })}>
                <Row style={{justifyContent: 'space-between'}}>
                  <Text style={{fontWeight: '700'}}>{item.title}</Text>
                  <Text style={{color: '#6b7280'}}>{item.fare}</Text>
                </Row>
                <Text style={{color: '#374151', marginTop: 6}}>{item.subtitle} • {item.time}</Text>
                <Text style={{marginTop: 6, color: '#6b7280'}}>Driver: {item.driver} • Status: {item.status}</Text>
              </TripItem>
            )}
          />
        </Content>
      </Container>
    </>
  );
}
