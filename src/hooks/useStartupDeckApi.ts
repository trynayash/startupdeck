
// Developed by Yash Suthar – StartupDeck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { startupDeckApi, ApiResponse, IdeaAnalysis, FeatureSet, MarketAnalysis, TechStack, PitchDeck } from '@/services/startupDeckApi';
import { toast } from 'sonner';

// Idea Analysis Hooks
export const useIdeaAnalysis = (analysisId: string) => {
  return useQuery<ApiResponse<IdeaAnalysis>>({
    queryKey: ['ideaAnalysis', analysisId],
    queryFn: () => startupDeckApi.ideas.getAnalysis(analysisId),
    enabled: !!analysisId,
  });
};

export const useIdeaHistory = (page = 1, limit = 10) => {
  return useQuery<ApiResponse<IdeaAnalysis[]>>({
    queryKey: ['ideaHistory', page, limit],
    queryFn: () => startupDeckApi.ideas.getHistory(page, limit),
  });
};

export const useAnalyzeIdea = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: startupDeckApi.ideas.analyze,
    onSuccess: (data) => {
      toast.success('Idea analysis completed successfully!');
      queryClient.invalidateQueries({ queryKey: ['ideaHistory'] });
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Analysis failed: ${error.message}`);
    },
  });
};

// Feature Generation Hooks
export const useGenerateFeatures = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: startupDeckApi.features.generateFeatures,
    onSuccess: (data) => {
      toast.success('Features generated successfully!');
      queryClient.invalidateQueries({ queryKey: ['features'] });
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Feature generation failed: ${error.message}`);
    },
  });
};

export const useFeatureRoadmap = (ideaId: string, timeframe?: string) => {
  return useQuery<ApiResponse<FeatureSet>>({
    queryKey: ['featureRoadmap', ideaId, timeframe],
    queryFn: () => startupDeckApi.features.getRoadmap(ideaId, timeframe as any),
    enabled: !!ideaId,
  });
};

export const usePrioritizeFeatures = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: startupDeckApi.features.prioritizeFeatures,
    onSuccess: (data) => {
      toast.success('Features prioritized successfully!');
      queryClient.invalidateQueries({ queryKey: ['features'] });
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Feature prioritization failed: ${error.message}`);
    },
  });
};

// Market Analysis Hooks
export const useMarketAnalysis = (ideaId: string) => {
  return useQuery<ApiResponse<MarketAnalysis>>({
    queryKey: ['marketAnalysis', ideaId],
    queryFn: () => startupDeckApi.market.analyzeMarket({ ideaId, industry: 'tech' }),
    enabled: !!ideaId,
  });
};

export const useCompetitorAnalysis = () => {
  return useMutation({
    mutationFn: startupDeckApi.market.getCompetitors,
    onSuccess: (data) => {
      toast.success('Competitor analysis completed!');
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Competitor analysis failed: ${error.message}`);
    },
  });
};

export const useMarketTrends = (industry: string) => {
  return useQuery({
    queryKey: ['marketTrends', industry],
    queryFn: () => startupDeckApi.market.getTrends({ industry }),
    enabled: !!industry,
  });
};

// Tech Stack Hooks
export const useTechStackRecommendation = () => {
  return useMutation({
    mutationFn: startupDeckApi.tech.getMvpStack,
    onSuccess: (data) => {
      toast.success('Tech stack recommendations generated!');
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Tech stack generation failed: ${error.message}`);
    },
  });
};

export const useTechStackComparison = () => {
  return useMutation({
    mutationFn: startupDeckApi.tech.compareStacks,
    onSuccess: (data) => {
      toast.success('Tech stack comparison completed!');
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Comparison failed: ${error.message}`);
    },
  });
};

export const useTechCostAnalysis = () => {
  return useMutation({
    mutationFn: startupDeckApi.tech.getCostAnalysis,
    onSuccess: (data) => {
      toast.success('Cost analysis completed!');
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Cost analysis failed: ${error.message}`);
    },
  });
};

// Pitch Deck Hooks
export const usePitchDeck = (deckId: string) => {
  return useQuery<ApiResponse<PitchDeck>>({
    queryKey: ['pitchDeck', deckId],
    queryFn: () => startupDeckApi.pitch.getDeck(deckId),
    enabled: !!deckId,
  });
};

export const useGeneratePitchDeck = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: startupDeckApi.pitch.generate,
    onSuccess: (data) => {
      toast.success('Pitch deck generated successfully!');
      queryClient.invalidateQueries({ queryKey: ['pitchDeck'] });
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Pitch deck generation failed: ${error.message}`);
    },
  });
};

export const useExportPitchDeck = () => {
  return useMutation({
    mutationFn: ({ deckId, format }: { deckId: string; format: 'pdf' | 'pptx' | 'html' }) => 
      startupDeckApi.pitch.exportDeck(deckId, format),
    onSuccess: (data) => {
      toast.success('Pitch deck exported successfully!');
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Export failed: ${error.message}`);
    },
  });
};

export const usePitchDeckTemplates = () => {
  return useQuery({
    queryKey: ['pitchDeckTemplates'],
    queryFn: startupDeckApi.pitch.getTemplates,
  });
};

// Analytics Hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: startupDeckApi.analytics.getDashboardStats,
  });
};

export const useIdeaMetrics = (ideaId: string) => {
  return useQuery({
    queryKey: ['ideaMetrics', ideaId],
    queryFn: () => startupDeckApi.analytics.getIdeaMetrics(ideaId),
    enabled: !!ideaId,
  });
};

// File Upload Hooks
export const useFileUpload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ file, path }: { file: File; path?: string }) => 
      startupDeckApi.assets.uploadFile(file, path),
    onSuccess: (data) => {
      toast.success('File uploaded successfully!');
      queryClient.invalidateQueries({ queryKey: ['userFiles'] });
      return data;
    },
    onError: (error: Error) => {
      toast.error(`File upload failed: ${error.message}`);
    },
  });
};

export const useUserFiles = (folder?: string) => {
  return useQuery({
    queryKey: ['userFiles', folder],
    queryFn: () => startupDeckApi.assets.listFiles(folder),
  });
};
