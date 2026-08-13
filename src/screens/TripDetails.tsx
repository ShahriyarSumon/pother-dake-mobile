import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import Header from '../components/Header';
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

const Card = styled.View`
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Button = styled.TouchableOpacity`
  background-color: #2563eb;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: 700;
`;

const SeatsInput = styled.TextInput`
  border-width: 1px;
  border-color: #e5e7eb;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
  width: 80px;
`;

export default function TripDetails({ route, navigation }: any) {
  const id = route?.params?.id;
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState('1');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (id) {
      api.fetchTripById(id).then(t => { if (mounted) setTrip(t); }).catch(() => { if (mounted) setTrip(null); }).finally(() => { if (mounted) setLoading(false); });
    } else {
      api.fetchTrips().then(list => { if (mounted) setTrip(list[0]); }).finally(() => { if (mounted) setLoading(false); });
    }
    return () => { mounted = false; };
  }, [id]);

  const onBook = async () => {
    const seatsNum = parseInt(seats, 10) || 1;
    setBooking(true);
    try {
      await api.bookTrip({ tripId: trip?.id, seatsBooked: seatsNum });
      setBooking(false);
      Alert.alert('Success', 'Trip booked (mock)');
      navigation.navigate('Passenger');
    } catch (err: any) {
      setBooking(false);
      const msg = err?.response?.data?.message || err?.message || 'Booking failed';
      Alert.alert('Error', String(msg));
    }
  };

  return (
    <>
      <Header navigation={navigation} title="Trip Details" />
      <Container>
        {loading ? (
          <ActivityIndicator style={{marginTop: 32}} size="large" color="#2563eb" />
        ) : (
          <Content>
            <SectionTitle>Trip</SectionTitle>
            <Card>
              <Text style={{fontSize: 18, fontWeight: '700'}}>{trip?.title}</Text>
              <Text style={{marginTop: 8}}>{trip?.pickup} → {trip?.dropoff}</Text>
              <Text style={{marginTop: 8}}>Driver: {trip?.driver} • Fare: {trip?.fare}</Text>
              <Text style={{marginTop: 8, color: '#6b7280'}}>Time: {trip?.time}</Text>
            </Card>

            <SectionTitle>Book seats</SectionTitle>
            <Card style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 8}}>Seats:</Text>
                <SeatsInput value={seats} onChangeText={setSeats} keyboardType="numeric" />
              </View>
              {booking ? <ActivityIndicator /> : (
                <Button onPress={onBook}>
                  <ButtonText>Book</ButtonText>
                </Button>
              )}
            </Card>

            <SectionTitle style={{marginTop: 16}}>Map</SectionTitle>
            <Card>
              <Text style={{color: '#6b7280'}}>Map placeholder — replace with react-native-maps or MapView</Text>
            </Card>

            <SectionTitle style={{marginTop: 16}}>Actions</SectionTitle>
            <Button onPress={() => alert('Contact driver (mock)')}>
              <ButtonText>Contact Driver</ButtonText>
            </Button>
          </Content>
        )}
      </Container>
    </>
  );
}
