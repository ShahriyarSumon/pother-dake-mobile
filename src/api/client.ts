import axios from 'axios';
import Constants from 'expo-constants';

const manifest = Constants.manifest || (Constants as any).expoConfig || {};
const baseURL = (manifest.extra && manifest.extra.apiUrl) || process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

const client = axios.create({
  baseURL,
  timeout: 10000,
});

export default client;
