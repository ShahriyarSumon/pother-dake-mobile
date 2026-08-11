import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import Card from '../components/ui/Card';
import ChartPlaceholder from '../components/ui/ChartPlaceholder';
import api from '../api';

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
  const [trips, setTrips] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.fetchTrips().then(data => { if (mounted) setTrips(data); }).catch(() => { if (mounted) setTrips([]); }).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Header navigation={navigation} title="Driver" />
      <Container>
        {loading ? (
          <ActivityIndicator style={{marginTop: 32}} size="large" color="#2563eb" />
        ) : (
          <Content>
            <SectionTitle>Earnings</SectionTitle>
            <Card>
              <Text style={{fontSize: 18, fontWeight: '700'}}>৳ 12,480</Text>
              <Text style={{color: '#6b7280', marginTop: 6}}>This month</Text>
            </Card>

            <SectionTitle style={{marginTop: 16}}>Live Requests</SectionTitle>
            <FlatList
              data={trips}
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
        )}
      </Container>
    </>
  );
}
