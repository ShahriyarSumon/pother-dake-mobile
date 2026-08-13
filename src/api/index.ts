import client, { setAuthToken, getAuthToken } from './client';
import mockData from '../services/mockData';

// Feature flag: if USE_MOCK=true (env or app.json) we'll fallback to mock data on errors.
import Constants from 'expo-constants';
const manifest = Constants.manifest || (Constants as any).expoConfig || {};
const USE_MOCK = (manifest.extra && manifest.extra.useMock) === true || process.env.USE_MOCK === 'true' || false;

// Helper to unwrap axios responses
const unwrap = (res: any) => res && res.data ? res.data : res;

export async function login(email: string, password: string) {
  try {
    const res = await client.post('/auth/login', { email, password });
    const data = unwrap(res);
    // try common token fields
    const token = data?.token || data?.accessToken || data?.data?.token;
    if (token) await setAuthToken(token);
    return data;
  } catch (err) {
    if (USE_MOCK) {
      // return mock login response
      const mock = { token: 'mock-token-123', user: { id: 'u1', name: 'Mock User', role: 'passenger', email } };
      await setAuthToken(mock.token);
      return mock;
    }
    throw err;
  }
}

export async function logout() {
  await setAuthToken(null);
}

export async function fetchTrips() {
  try {
    // assumption: server exposes GET /tripRoute to list trips
    const res = await client.get('/tripRoute');
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return mockData.trips;
    throw err;
  }
}

export async function fetchTripById(id: string) {
  try {
    const res = await client.get(`/tripRoute/${id}`);
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return mockData.trips.find(t => t.id === id) || null;
    throw err;
  }
}

export async function createTrip(payload: any) {
  try {
    const res = await client.post('/tripRoute/create', payload);
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return { ok: true, created: payload };
    throw err;
  }
}

export async function deleteTrip(id: string) {
  try {
    const res = await client.delete(`/tripRoute/${id}`);
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return { ok: true, id };
    throw err;
  }
}

export async function getMyTrips() {
  try {
    const res = await client.get('/tripRoute/my-trips');
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return mockData.trips;
    throw err;
  }
}

export async function bookTrip(payload: { tripId: string; passengerId: string; seatsBooked: number }) {
  try {
    const res = await client.post('/tripBookedRoute/tripBooked', payload);
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return { ok: true, booking: payload };
    throw err;
  }
}

export async function getAllBookings() {
  try {
    const res = await client.get('/tripBookedRoute');
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return [];
    throw err;
  }
}

export async function getAllDrivers() {
  try {
    const res = await client.get('/user/drivers');
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return mockData.drivers;
    throw err;
  }
}

export async function getAllPassengers() {
  try {
    const res = await client.get('/user/passengers');
    return unwrap(res);
  } catch (err) {
    if (USE_MOCK) return [];
    throw err;
  }
}

export default {
  login,
  logout,
  fetchTrips,
  fetchTripById,
  createTrip,
  deleteTrip,
  getMyTrips,
  bookTrip,
  getAllBookings,
  getAllDrivers,
  getAllPassengers
};
