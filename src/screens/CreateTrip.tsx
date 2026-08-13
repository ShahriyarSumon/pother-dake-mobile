import styled from 'styled-components/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Header from '../components/Header';
import api from '../api';

const Container = styled.View`
  flex: 1;
  background-color: ${p => p.theme.colors.background};
`;

const Content = styled.ScrollView`
  padding: 16px;
`;

const Field = styled.TextInput`
  border-width: 1px;
  border-color: #e5e7eb;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #fff;
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

export default function CreateTrip({ navigation }: any) {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [stopPoints, setStopPoints] = useState('');
  const [date, setDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [availableSeats, setAvailableSeats] = useState('1');
  const [pricePerSeat, setPricePerSeat] = useState('');
  const [bookingType, setBookingType] = useState('Instant');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [ac, setAc] = useState(true);
  const [music, setMusic] = useState(true);
  const [luggage, setLuggage] = useState(true);

  const onSubmit = async () => {
    if (!startingPoint || !destination) return Alert.alert('Error', 'Starting point and destination required');
    const payload = {
      driverId: undefined, // server should use token to identify driver
      startingPoint: {
        addressName: startingPoint,
        location: { type: 'Point', coordinates: [0, 0] }
      },
      destination: {
        addressName: destination,
        location: { type: 'Point', coordinates: [0, 0] }
      },
      stopPoints: stopPoints ? stopPoints.split(',').map(s => s.trim()) : [],
      date,
      departureTime,
      estimatedArrivalTime,
      vehicleType,
      availableSeats: parseInt(availableSeats, 10) || 1,
      preferences: { ac, music, luggage, pets: false, smoking: false, helmet: false, womenOnly: false, maxLuggageWeight: 10 },
      pricePerSeat: parseFloat(pricePerSeat) || 0,
      bookingType,
      description
    };

    try {
      setLoading(true);
      await api.createTrip(payload);
      setLoading(false);
      Alert.alert('Success', 'Trip created');
      navigation.navigate('Passenger');
    } catch (err: any) {
      setLoading(false);
      const msg = err?.response?.data?.message || err?.message || 'Create trip failed';
      Alert.alert('Error', String(msg));
    }
  };

  return (
    <>
      <Header navigation={navigation} title="Create Trip" />
      <Container>
        <Content>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 12}}>Create Trip</Text>
          <Field placeholder="Starting point (address)" value={startingPoint} onChangeText={setStartingPoint} />
          <Field placeholder="Destination (address)" value={destination} onChangeText={setDestination} />
          <Field placeholder="Stop points (comma separated)" value={stopPoints} onChangeText={setStopPoints} />
          <Field placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
          <Field placeholder="Departure time (e.g. 08:00 AM)" value={departureTime} onChangeText={setDepartureTime} />
          <Field placeholder="Estimated arrival time" value={estimatedArrivalTime} onChangeText={setEstimatedArrivalTime} />
          <Field placeholder="Vehicle type" value={vehicleType} onChangeText={setVehicleType} />
          <Field placeholder="Available seats" value={availableSeats} onChangeText={setAvailableSeats} keyboardType="numeric" />
          <Field placeholder="Price per seat" value={pricePerSeat} onChangeText={setPricePerSeat} keyboardType="numeric" />
          <Field placeholder="Booking type" value={bookingType} onChangeText={setBookingType} />
          <Field placeholder="Description" value={description} onChangeText={setDescription} multiline numberOfLines={3} />

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
            <TouchableOpacity onPress={() => setAc(!ac)} style={{padding: 8}}>
              <Text style={{color: ac ? '#2563eb' : '#374151'}}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMusic(!music)} style={{padding: 8}}>
              <Text style={{color: music ? '#2563eb' : '#374151'}}>Music</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLuggage(!luggage)} style={{padding: 8}}>
              <Text style={{color: luggage ? '#2563eb' : '#374151'}}>Luggage</Text>
            </TouchableOpacity>
          </View>

          {loading ? <ActivityIndicator size="large" color="#2563eb" style={{marginTop: 12}} /> : (
            <Button onPress={onSubmit}>
              <ButtonText>Create Trip</ButtonText>
            </Button>
          )}
        </Content>
      </Container>
    </>
  );
}
