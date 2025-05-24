
// Developed by Yash Suthar – StartupDeck
import { supabase } from '@/integrations/supabase/client';

// Base API URL for our custom Node.js or FastAPI backend
const API_BASE_URL = 'https://api.startupdeck.app/v1';

/**
 * Create a headers object with auth token if user is logged in
 */
const getHeaders = async (): Promise<HeadersInit> => {
  const { data } = await supabase.auth.getSession();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (data.session?.access_token) {
    headers['Authorization'] = `Bearer ${data.session.access_token}`;
  }

  return headers;
};

/**
 * Generic API request function
 */
const apiRequest = async <T>(
  endpoint: string, 
  method: string = 'GET', 
  data?: any
): Promise<T> => {
  const headers = await getHeaders();
  
  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

// API endpoints
export const api = {
  // Business idea analysis
  analyzeIdea: (ideaData: any) => 
    apiRequest('/analyze', 'POST', ideaData),
  
  getAnalysisById: (id: string) => 
    apiRequest(`/analyze/${id}`),
  
  // Market mapping
  getMarketMap: (ideaId: string) => 
    apiRequest(`/market/${ideaId}`),
  
  // Tech stack recommendations
  getTechRecommendations: (ideaId: string) => 
    apiRequest(`/tech/${ideaId}`),
  
  // Pitch deck generation
  generatePitchDeck: (ideaId: string, options?: any) => 
    apiRequest('/pitch-deck', 'POST', { ideaId, ...options }),
  
  getPitchDeckById: (id: string) => 
    apiRequest(`/pitch-deck/${id}`),
  
  // User data management
  getUserData: () => 
    apiRequest('/user/data'),
  
  updateUserPreferences: (preferences: any) => 
    apiRequest('/user/preferences', 'PUT', preferences),
  
  // Fallback method for any custom endpoint
  custom: <T>(endpoint: string, method: string = 'GET', data?: any) => 
    apiRequest<T>(endpoint, method, data),
};
