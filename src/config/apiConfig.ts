
// Developed by Yash Suthar – StartupDeck
// API Configuration for all services

// Define the base URLs for different environments
const environments = {
  development: {
    baseUrl: 'http://localhost:8000/api/v1',
    storageUrl: 'http://localhost:8000/storage',
  },
  staging: {
    baseUrl: 'https://staging-api.startupdeck.app/v1',
    storageUrl: 'https://staging-api.startupdeck.app/storage',
  },
  production: {
    baseUrl: 'https://api.startupdeck.app/v1',
    storageUrl: 'https://api.startupdeck.app/storage',
  },
};

// Determine the current environment
const getEnvironment = () => {
  const host = window.location.hostname;
  
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'development';
  } else if (host.includes('staging') || host.includes('test')) {
    return 'staging';
  }
  
  return 'production';
};

// Export the configuration for the current environment
const currentEnv = getEnvironment();
export const apiConfig = environments[currentEnv as keyof typeof environments];

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    verifyToken: '/auth/verify',
  },
  
  // User management
  users: {
    me: '/users/me',
    profile: '/users/profile',
    preferences: '/users/preferences',
  },
  
  // Business analysis
  analysis: {
    create: '/analysis',
    get: (id: string) => `/analysis/${id}`,
    list: '/analysis',
    update: (id: string) => `/analysis/${id}`,
    delete: (id: string) => `/analysis/${id}`,
  },
  
  // Market research
  market: {
    research: '/market/research',
    competitors: '/market/competitors',
    trends: '/market/trends',
  },
  
  // Features and roadmap
  features: {
    recommend: '/features/recommend',
    prioritize: '/features/prioritize',
    roadmap: '/features/roadmap',
  },
  
  // Tech stack
  tech: {
    recommend: '/tech/recommend',
    compare: '/tech/compare',
    cost: '/tech/cost-analysis',
  },
  
  // Pitch deck
  pitch: {
    generate: '/pitch/generate',
    get: (id: string) => `/pitch/${id}`,
    templates: '/pitch/templates',
    export: (id: string, format: string) => `/pitch/${id}/export/${format}`,
  },
};

// Constants for API settings
export const apiSettings = {
  defaultTimeout: 30000, // 30 seconds
  retryAttempts: 3,
  cacheTime: 5 * 60 * 1000, // 5 minutes
};
