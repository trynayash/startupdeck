
// Developed by Yash Suthar – StartupDeck
import { toast } from 'sonner';

/**
 * Generic error handler for API requests
 */
export const handleApiError = (error: any, customMessage?: string) => {
  console.error('API Error:', error);
  
  let message = customMessage || 'An unexpected error occurred';
  
  if (error?.message) {
    message = error.message;
  } else if (error?.response?.data?.message) {
    message = error.response.data.message;
  } else if (typeof error === 'string') {
    message = error;
  }
  
  toast.error(message);
  return message;
};

/**
 * Success handler for API requests
 */
export const handleApiSuccess = (message: string, data?: any) => {
  toast.success(message);
  console.log('API Success:', { message, data });
  return data;
};

/**
 * Retry logic for failed API requests
 */
export const retryApiRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }
  
  throw lastError;
};

/**
 * Format API response data for display
 */
export const formatApiResponse = (data: any) => {
  if (!data) return null;
  
  // Remove sensitive information
  const sanitized = { ...data };
  delete sanitized.token;
  delete sanitized.password;
  delete sanitized.secret;
  
  return sanitized;
};

/**
 * Validate required fields before API calls
 */
export const validateRequiredFields = (data: Record<string, any>, requiredFields: string[]): boolean => {
  const missingFields = requiredFields.filter(field => 
    !data[field] || (typeof data[field] === 'string' && data[field].trim() === '')
  );
  
  if (missingFields.length > 0) {
    toast.error(`Missing required fields: ${missingFields.join(', ')}`);
    return false;
  }
  
  return true;
};

/**
 * Cache management for API responses
 */
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  set(key: string, data: any, ttlMinutes = 5) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000,
    });
  }
  
  get(key: string) {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }
  
  clear() {
    this.cache.clear();
  }
  
  delete(key: string) {
    this.cache.delete(key);
  }
}

export const apiCache = new ApiCache();

/**
 * Rate limiting helper
 */
class RateLimiter {
  private requests = new Map<string, number[]>();
  
  canMakeRequest(endpoint: string, maxRequests = 10, windowMs = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(endpoint)) {
      this.requests.set(endpoint, []);
    }
    
    const endpointRequests = this.requests.get(endpoint)!;
    
    // Remove old requests outside the window
    const validRequests = endpointRequests.filter(timestamp => timestamp > windowStart);
    this.requests.set(endpoint, validRequests);
    
    if (validRequests.length >= maxRequests) {
      toast.error('Rate limit exceeded. Please wait before making more requests.');
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

/**
 * API request logger for debugging
 */
export const logApiRequest = (endpoint: string, method: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🌐 API Request: ${method} ${endpoint}`);
    console.log('Timestamp:', new Date().toISOString());
    if (data) {
      console.log('Request Data:', formatApiResponse(data));
    }
    console.groupEnd();
  }
};

export const logApiResponse = (endpoint: string, response: any, duration?: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`✅ API Response: ${endpoint}`);
    console.log('Timestamp:', new Date().toISOString());
    if (duration) {
      console.log('Duration:', `${duration}ms`);
    }
    console.log('Response:', formatApiResponse(response));
    console.groupEnd();
  }
};

/**
 * Transform data for different API endpoints
 */
export const transformDataForApi = {
  idea: (formData: any) => ({
    idea: formData.idea?.trim(),
    industry: formData.industry,
    targetMarket: formData.targetMarket,
    budget: formData.budget ? parseInt(formData.budget) : undefined,
    timeline: formData.timeline,
  }),
  
  features: (formData: any) => ({
    ideaId: formData.ideaId,
    category: formData.category || 'core',
    count: formData.count ? parseInt(formData.count) : 10,
  }),
  
  market: (formData: any) => ({
    ideaId: formData.ideaId,
    industry: formData.industry,
    region: formData.region || ['global'],
    depth: formData.depth || 'basic',
  }),
  
  techStack: (formData: any) => ({
    ideaId: formData.ideaId,
    platform: formData.platform || 'web',
    budget: formData.budget || 'medium',
    timeline: formData.timeline,
    team_size: formData.teamSize ? parseInt(formData.teamSize) : 3,
  }),
  
  pitchDeck: (formData: any) => ({
    ideaId: formData.ideaId,
    template: formData.template || 'standard',
    slides: formData.slides,
    branding: {
      primaryColor: formData.primaryColor || '#3b82f6',
      companyName: formData.companyName,
      logo: formData.logo,
    },
  }),
};
