import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api';
import Header from '../components/Header';
import styledDefault from 'styled-components/native';

const Container = styledDefault.View`
  flex: 1;
  padding: 16px;
  background-color: ${p => p.theme.colors.background};
`;

const Item = styledDefault.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  background-color: #f8fafc;
  margin-bottom: 8px;
`;

export default function SearchResults({ navigation }: any) {
  const [trips, setTrips] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.fetchTrips().then(data => {
      if (mounted) setTrips(data);
    }).catch(() => {
      if (mounted) setTrips([]);
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Header navigation={navigation} title="Search" />
      <Container>
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item onPress={() => navigation.navigate('TripDetails', { id: item.id })}>
                <Text style={{fontWeight: '600'}}>{item.title}</Text>
                <Text>{item.subtitle}</Text>
              </Item>
            )}
          />
        )}
      </Container>
    </>
  );
}
