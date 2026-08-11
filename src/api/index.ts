import Constants from 'expo-constants';
import mockData from '../services/mockData';

const manifest = Constants.manifest || (Constants as any).expoConfig || {};
const useMock = (manifest.extra && manifest.extra.useMock) || process.env.USE_MOCK === 'true' || true; // default to mock

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function fetchTrips() {
  if (useMock) {
    await delay(400);
    return mockData.trips;
  }
  // future: call real API via src/api/client.ts
  throw new Error('No backend configured');
}

export async function fetchTripById(id: string) {
  if (useMock) {
    await delay(300);
    return mockData.trips.find(t => t.id === id) || null;
  }
  throw new Error('No backend configured');
}

export async function fetchStats() {
  if (useMock) {
    await delay(200);
    return mockData.stats;
  }
  throw new Error('No backend configured');
}

export async function fetchDrivers() {
  if (useMock) {
    await delay(200);
    return mockData.drivers;
  }
  throw new Error('No backend configured');
}

export async function loginWithOtp(payload: { phone: string; otp?: string }) {
  if (useMock) {
    await delay(500);
    return {
      token: 'mock-token-123',
      user: { id: 'u1', name: 'Mock User', role: 'passenger', phone: payload.phone }
    };
  }
  throw new Error('No backend configured');
}
