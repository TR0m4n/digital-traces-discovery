import { API_TIMEOUT } from './constants';

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: API_TIMEOUT,
  endpoints: {
    analyze: '/api/analyze'
  }
}; 