import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/Landing';
import SearchResults from '../screens/SearchResults';
import TripDetails from '../screens/TripDetails';
import AuthScreen from '../screens/Auth';
import PassengerDashboard from '../screens/PassengerDashboard';
import DriverDashboard from '../screens/DriverDashboard';
import AdminDashboard from '../screens/AdminDashboard';

export type RootStackParamList = {
  Landing: undefined;
  Search: undefined;
  TripDetails: { id?: string } | undefined;
  Auth: undefined;
  Passenger: undefined;
  Driver: undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Search" component={SearchResults} />
      <Stack.Screen name="TripDetails" component={TripDetails} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Passenger" component={PassengerDashboard} />
      <Stack.Screen name="Driver" component={DriverDashboard} />
      <Stack.Screen name="Admin" component={AdminDashboard} />
    </Stack.Navigator>
  );
}
