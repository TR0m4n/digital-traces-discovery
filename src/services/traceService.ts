import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface Trace {
  id: string;
  app_name: string;
  os_name: string;
  os_version: string;
  app_version: string;
  file_path: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const traceService = {
  async getRecentTraces(): Promise<Trace[]> {
    const response = await axios.get(`${API_URL}/traces`);
    return response.data;
  },

  async getTraceById(id: string): Promise<Trace> {
    const response = await axios.get(`${API_URL}/traces/${id}`);
    return response.data;
  },

  async createTrace(trace: Omit<Trace, 'id' | 'created_at' | 'updated_at'>): Promise<{ id: string }> {
    const response = await axios.post(`${API_URL}/traces`, trace);
    return response.data;
  },

  async searchTraces(query: string): Promise<Trace[]> {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query }
    });
    return response.data;
  }
}; 