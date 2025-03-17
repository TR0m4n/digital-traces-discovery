import { API_CONFIG } from '../config/api';
import { AnalysisResult } from '../config/constants';

class ApiService {
  private async fetchWithTimeout(url: string, options: RequestInit = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async analyzeFiles(files: File[]): Promise<AnalysisResult> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    return this.fetchWithTimeout(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.analyze}`, {
      method: 'POST',
      body: formData
    });
  }
}

export const apiService = new ApiService(); 