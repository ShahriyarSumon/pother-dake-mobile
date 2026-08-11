import styled from 'styled-components/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Card from '../components/ui/Card';
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

export default function TripDetails({ route, navigation }: any) {
  const id = route?.params?.id;
  const trip = mockData.trips.find(t => t.id === id) || mockData.trips[0];

  return (
    <>
      <Header navigation={navigation} title="Trip Details" />
      <Container>
        <Content>
          <SectionTitle>Trip</SectionTitle>
          <Card>
            <Text style={{fontSize: 18, fontWeight: '700'}}>{trip.title}</Text>
            <Text style={{marginTop: 8}}>{trip.pickup} → {trip.dropoff}</Text>
            <Text style={{marginTop: 8}}>Driver: {trip.driver} • Fare: {trip.fare}</Text>
            <Text style={{marginTop: 8, color: '#6b7280'}}>Time: {trip.time}</Text>
          </Card>

          <SectionTitle style={{marginTop: 16}}>Map</SectionTitle>
          <Card>
            <Text style={{color: '#6b7280'}}>Map placeholder — replace with react-native-maps or MapView</Text>
          </Card>

          <SectionTitle style={{marginTop: 16}}>Actions</SectionTitle>
          <TouchableOpacity onPress={() => alert('Contact driver (mock)')} style={{backgroundColor: '#2563eb', padding: 12, borderRadius: 8}}>
            <Text style={{color: '#fff', fontWeight: '700'}}>Contact Driver</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    </>
  );
}
