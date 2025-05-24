
// Developed by Yash Suthar – StartupDeck
import { supabase } from '@/integrations/supabase/client';

// Custom StartupDeck API Configuration
const STARTUP_DECK_API_BASE = 'https://api.startupdeck.app/v1';

/**
 * Enhanced headers with Supabase JWT authentication
 */
const getAuthHeaders = async (): Promise<HeadersInit> => {
  const { data } = await supabase.auth.getSession();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Client': 'StartupDeck-Web',
    'X-Version': '1.0.0',
  };

  if (data.session?.access_token) {
    headers['Authorization'] = `Bearer ${data.session.access_token}`;
  }

  return headers;
};

/**
 * Core API request handler with authentication and error handling
 */
const apiRequest = async <T>(
  endpoint: string, 
  method: string = 'GET', 
  data?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  const headers = await getAuthHeaders();
  
  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: 'include',
    ...options,
  };

  if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${STARTUP_DECK_API_BASE}${endpoint}`, requestOptions);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
};

// Business Idea Analysis API
export const ideaAnalysisApi = {
  // Analyze a new business idea
  analyze: (ideaData: {
    idea: string;
    industry?: string;
    targetMarket?: string;
    budget?: number;
    timeline?: string;
  }): Promise<ApiResponse<IdeaAnalysis>> => apiRequest('/ideas/analyze', 'POST', ideaData),

  // Get analysis by ID
  getAnalysis: (analysisId: string): Promise<ApiResponse<IdeaAnalysis>> => 
    apiRequest(`/ideas/analysis/${analysisId}`),

  // Get user's analysis history
  getHistory: (page = 1, limit = 10): Promise<ApiResponse<IdeaAnalysis[]>> => 
    apiRequest(`/ideas/history?page=${page}&limit=${limit}`),

  // Update analysis
  updateAnalysis: (analysisId: string, updates: any): Promise<ApiResponse<IdeaAnalysis>> => 
    apiRequest(`/ideas/analysis/${analysisId}`, 'PUT', updates),

  // Delete analysis
  deleteAnalysis: (analysisId: string): Promise<ApiResponse<void>> => 
    apiRequest(`/ideas/analysis/${analysisId}`, 'DELETE'),
};

// Feature Generation API
export const featureGenerationApi = {
  // Generate features for an idea
  generateFeatures: (data: {
    ideaId: string;
    category?: 'core' | 'advanced' | 'premium';
    count?: number;
  }): Promise<ApiResponse<FeatureSet>> => apiRequest('/features/generate', 'POST', data),

  // Prioritize features
  prioritizeFeatures: (data: {
    ideaId: string;
    features: string[];
    criteria?: 'impact' | 'effort' | 'revenue' | 'user_value';
  }): Promise<ApiResponse<FeatureSet>> => apiRequest('/features/prioritize', 'POST', data),

  // Get feature roadmap
  getRoadmap: (ideaId: string, timeframe?: '3months' | '6months' | '1year'): Promise<ApiResponse<FeatureSet>> => 
    apiRequest(`/features/roadmap/${ideaId}?timeframe=${timeframe || '6months'}`),

  // Estimate feature development cost
  estimateCost: (data: {
    features: string[];
    complexity?: 'low' | 'medium' | 'high';
    region?: 'us' | 'eu' | 'asia';
  }): Promise<ApiResponse<any>> => apiRequest('/features/estimate-cost', 'POST', data),
};

// Market Mapping API
export const marketMappingApi = {
  // Analyze market landscape
  analyzeMarket: (data: {
    ideaId: string;
    industry: string;
    region?: string[];
    depth?: 'basic' | 'comprehensive';
  }): Promise<ApiResponse<MarketAnalysis>> => apiRequest('/market/analyze', 'POST', data),

  // Get competitor analysis
  getCompetitors: (data: {
    ideaId: string;
    region?: string;
    includeIndirect?: boolean;
  }): Promise<ApiResponse<any>> => apiRequest('/market/competitors', 'POST', data),

  // Market size estimation
  getMarketSize: (data: {
    industry: string;
    region: string;
    segment?: string;
  }): Promise<ApiResponse<any>> => apiRequest('/market/size', 'POST', data),

  // Trend analysis
  getTrends: (data: {
    industry: string;
    timeframe?: '1year' | '3years' | '5years';
  }): Promise<ApiResponse<any>> => apiRequest('/market/trends', 'POST', data),

  // Customer personas
  generatePersonas: (ideaId: string): Promise<ApiResponse<any>> => 
    apiRequest(`/market/personas/${ideaId}`, 'POST'),
};

// Tech Stack Recommendation API
export const techStackApi = {
  // Get MVP tech stack recommendations
  getMvpStack: (data: {
    ideaId: string;
    platform: 'web' | 'mobile' | 'both';
    budget?: 'low' | 'medium' | 'high';
    timeline?: string;
    team_size?: number;
  }): Promise<ApiResponse<TechStack>> => apiRequest('/tech/mvp-stack', 'POST', data),

  // Compare tech stacks
  compareStacks: (data: {
    stacks: string[];
    criteria: string[];
  }): Promise<ApiResponse<any>> => apiRequest('/tech/compare', 'POST', data),

  // Get cost analysis for tech stack
  getCostAnalysis: (data: {
    technologies: string[];
    scale?: 'startup' | 'growth' | 'enterprise';
    region?: string;
  }): Promise<ApiResponse<any>> => apiRequest('/tech/cost-analysis', 'POST', data),

  // Architecture recommendations
  getArchitecture: (data: {
    ideaId: string;
    scale: 'mvp' | 'growth' | 'enterprise';
    requirements?: string[];
  }): Promise<ApiResponse<any>> => apiRequest('/tech/architecture', 'POST', data),

  // Development timeline estimation
  getTimeline: (data: {
    techStack: string[];
    features: string[];
    teamSize: number;
  }): Promise<ApiResponse<any>> => apiRequest('/tech/timeline', 'POST', data),
};

// Pitch Deck Creation API
export const pitchDeckApi = {
  // Generate pitch deck
  generate: (data: {
    ideaId: string;
    template?: 'standard' | 'investor' | 'demo_day' | 'accelerator';
    slides?: string[];
    branding?: {
      primaryColor?: string;
      logo?: string;
      companyName?: string;
    };
  }): Promise<ApiResponse<PitchDeck>> => apiRequest('/pitch/generate', 'POST', data),

  // Get pitch deck by ID
  getDeck: (deckId: string): Promise<ApiResponse<PitchDeck>> => 
    apiRequest(`/pitch/deck/${deckId}`),

  // Update pitch deck
  updateDeck: (deckId: string, updates: any): Promise<ApiResponse<PitchDeck>> => 
    apiRequest(`/pitch/deck/${deckId}`, 'PUT', updates),

  // Export pitch deck
  exportDeck: (deckId: string, format: 'pdf' | 'pptx' | 'html'): Promise<ApiResponse<any>> => 
    apiRequest(`/pitch/deck/${deckId}/export?format=${format}`, 'POST'),

  // Get available templates
  getTemplates: (): Promise<ApiResponse<any>> => 
    apiRequest('/pitch/templates'),

  // Generate presentation script
  generateScript: (deckId: string, duration?: number): Promise<ApiResponse<any>> => 
    apiRequest(`/pitch/deck/${deckId}/script`, 'POST', { duration }),

  // Analytics for pitch deck views
  getAnalytics: (deckId: string): Promise<ApiResponse<any>> => 
    apiRequest(`/pitch/deck/${deckId}/analytics`),
};

// Analytics and Insights API
export const analyticsApi = {
  // User dashboard analytics
  getDashboardStats: (): Promise<ApiResponse<any>> => 
    apiRequest('/analytics/dashboard'),

  // Idea performance metrics
  getIdeaMetrics: (ideaId: string): Promise<ApiResponse<any>> => 
    apiRequest(`/analytics/idea/${ideaId}`),

  // Platform usage statistics
  getUsageStats: (timeframe?: string): Promise<ApiResponse<any>> => 
    apiRequest(`/analytics/usage?timeframe=${timeframe || '30days'}`),

  // Export user data
  exportUserData: (format: 'json' | 'csv'): Promise<ApiResponse<any>> => 
    apiRequest(`/analytics/export?format=${format}`, 'POST'),
};

// File and Asset Management API
export const assetApi = {
  // Upload file to user-assets bucket
  uploadFile: async (file: File, path?: string): Promise<any> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');

    const filePath = path ? `${user.id}/${path}` : `${user.id}/${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('user-assets')
      .upload(filePath, file);

    if (error) throw error;
    return data;
  },

  // Get file URL
  getFileUrl: async (path: string): Promise<string> => {
    const { data } = supabase.storage
      .from('user-assets')
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  // Delete file
  deleteFile: async (path: string): Promise<any> => {
    const { data, error } = await supabase.storage
      .from('user-assets')
      .remove([path]);

    if (error) throw error;
    return data;
  },

  // List user files
  listFiles: async (folder?: string): Promise<any> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');

    const path = folder ? `${user.id}/${folder}` : user.id;
    
    const { data, error } = await supabase.storage
      .from('user-assets')
      .list(path);

    if (error) throw error;
    return data;
  },
};

// Main API export with all endpoints
export const startupDeckApi = {
  ideas: ideaAnalysisApi,
  features: featureGenerationApi,
  market: marketMappingApi,
  tech: techStackApi,
  pitch: pitchDeckApi,
  analytics: analyticsApi,
  assets: assetApi,
};

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface IdeaAnalysis {
  id: string;
  idea: string;
  analysis: {
    viability: number;
    marketPotential: number;
    competitiveness: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface FeatureSet {
  id: string;
  ideaId: string;
  features: {
    core: string[];
    advanced: string[];
    premium: string[];
  };
  roadmap: {
    phase: string;
    features: string[];
    timeline: string;
    effort: string;
  }[];
  createdAt: string;
}

export interface MarketAnalysis {
  id: string;
  ideaId: string;
  marketSize: {
    tam: number;
    sam: number;
    som: number;
  };
  competitors: {
    name: string;
    description: string;
    strengths: string[];
    weaknesses: string[];
    marketShare?: number;
  }[];
  trends: string[];
  opportunities: string[];
  createdAt: string;
}

export interface TechStack {
  id: string;
  ideaId: string;
  stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    hosting: string[];
    tools: string[];
  };
  estimated_cost: {
    development: number;
    hosting: number;
    tools: number;
    total: number;
  };
  timeline: string;
  createdAt: string;
}

export interface PitchDeck {
  id: string;
  ideaId: string;
  slides: {
    type: string;
    title: string;
    content: any;
    order: number;
  }[];
  template: string;
  branding: {
    primaryColor: string;
    companyName: string;
    logo?: string;
  };
  createdAt: string;
  updatedAt: string;
}
