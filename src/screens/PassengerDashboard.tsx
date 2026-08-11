import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../components/Header';
import StatCard from '../components/ui/StatCard';
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
  const [stats, setStats] = useState<any>(null);
  const [trips, setTrips] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([api.fetchStats(), api.fetchTrips()]).then(([s, t]) => {
      if (mounted) {
        setStats(s);
        setTrips(t);
      }
    }).catch(() => {
      if (mounted) {
        setStats(null);
        setTrips([]);
      }
    }).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Header navigation={navigation} title="Passenger" />
      <Container>
        {loading ? (
          <ActivityIndicator style={{marginTop: 32}} size="large" color="#2563eb" />
        ) : (
          <Content>
            <SectionTitle>Overview</SectionTitle>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 12}}>
              <StatCard label="Total Rides" value={stats?.totalRides ?? '-'} />
              <StatCard label="Today" value={stats?.todayRides ?? '-'} />
              <StatCard label="Revenue Today" value={stats?.revenueToday ?? '-'} />
            </ScrollView>

            <SectionTitle>Activity</SectionTitle>
            <Card>
              <ChartPlaceholder title="Rides (last 7 days)" />
            </Card>

            <SectionTitle style={{marginTop: 16}}>Your Upcoming / Recent Trips</SectionTitle>
            <FlatList
              data={trips}
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
        )}
      </Container>
    </>
  );
}
