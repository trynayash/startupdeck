
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import IdeaAnalyzerForm from '@/components/analyze/IdeaAnalyzerForm';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Mock analysis sections for development
const mockAnalysisSections = {
  market: {
    title: "Market Potential Analysis",
    summary: "The market for this idea shows strong growth potential with an increasing demand for personalized solutions.",
    tam: "$50 billion",
    sam: "$15 billion",
    som: "$1.2 billion",
    growthRate: "12% annually",
    targetAudience: ["Small business owners", "Freelancers", "Remote workers"],
    trends: [
      "Growing demand for automation solutions",
      "Increased focus on productivity tools",
      "Rising acceptance of AI-powered solutions"
    ]
  },
  features: {
    title: "Feature Recommendations",
    summary: "Focus on core functionality that addresses the main pain points while planning for future expansions.",
    mvpFeatures: [
      { name: "User onboarding wizard", priority: "High" },
      { name: "Dashboard with key metrics", priority: "High" },
      { name: "Basic reporting functionality", priority: "Medium" },
      { name: "User profile management", priority: "Medium" }
    ],
    advancedFeatures: [
      { name: "Advanced analytics", priority: "Medium" },
      { name: "Team collaboration tools", priority: "Medium" },
      { name: "API access for integration", priority: "Low" },
      { name: "White-labeling options", priority: "Low" }
    ]
  },
  competitors: {
    title: "Competitive Landscape Analysis",
    summary: "The market has established players but lacks solutions that combine all the features you're proposing.",
    directCompetitors: [
      { name: "CompetitorX", strengths: ["Market leader", "Strong brand"], weaknesses: ["Expensive", "Complex UI"] },
      { name: "CompetitorY", strengths: ["Low cost", "Simple to use"], weaknesses: ["Limited features", "Poor support"] }
    ],
    indirectCompetitors: [
      { name: "AlternativeZ", strengths: ["Well-funded", "Large user base"], weaknesses: ["Different target market", "Not specialized"] }
    ],
    differentiators: [
      "All-in-one solution versus fragmented alternatives",
      "Focus on specific industry needs",
      "Superior user experience and onboarding"
    ]
  },
  techStack: {
    title: "Technical Stack Recommendations",
    summary: "A modern, scalable stack that balances development speed with long-term maintainability.",
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "PostgreSQL"],
    infrastructure: ["AWS", "Docker", "CI/CD with GitHub Actions"],
    considerations: [
      "Start with a monolith for speed of development",
      "Plan for microservices transition as user base grows",
      "Implement robust testing from the beginning"
    ]
  },
  pitchDeck: {
    title: "Auto-Generated Pitch Deck",
    summary: "A compelling presentation highlighting key aspects of your business idea.",
    slides: [
      { title: "Problem Statement", content: "Current solutions are expensive, complex, and lack integration." },
      { title: "Solution Overview", content: "An all-in-one platform that simplifies the process while reducing costs." },
      { title: "Market Size", content: "TAM: $50B, SAM: $15B, SOM: $1.2B with 12% annual growth." },
      { title: "Competitive Advantage", content: "Unique combination of features, better UX, and industry-specific focus." },
      { title: "Business Model", content: "Freemium SaaS with tiered pricing based on features and usage." },
      { title: "Go-to-Market Strategy", content: "Content marketing, partnerships, and limited free tier to drive adoption." },
      { title: "Team", content: "Experienced founders with background in the industry and technical expertise." },
      { title: "Financial Projections", content: "Break-even in 18 months, $1M ARR by year 2." },
      { title: "Funding Ask", content: "$500K seed round to achieve product-market fit and initial traction." },
      { title: "Vision & Roadmap", content: "Become the industry standard within 5 years through continuous innovation." }
    ]
  }
};

const AnalyzePage = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleIdeaSubmit = async (idea: string) => {
    if (!user) {
      toast.error('You must be logged in to analyze ideas');
      navigate('/login');
      return;
    }
    
    // Check if user has ideas remaining
    if (profile?.ideas_remaining <= 0 && profile?.subscription_tier === 'free') {
      toast.error('You have used all your free analyses. Please upgrade your plan.');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // 1. Create a new business idea record
      const { data: ideaData, error: ideaError } = await supabase
        .from('business_ideas')
        .insert([
          { user_id: user.id, idea_text: idea }
        ])
        .select()
        .single();
        
      if (ideaError) throw ideaError;
      
      // 2. In a real app, we would call the AI API here
      // For now, we'll simulate a delay and use mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 3. Create analysis records for each section
      const analysisSections = Object.entries(mockAnalysisSections).map(([key, value]) => ({
        business_idea_id: ideaData.id,
        section_type: key,
        content: value
      }));
      
      const { error: analysisError } = await supabase
        .from('analyses')
        .insert(analysisSections);
        
      if (analysisError) throw analysisError;
      
      // 4. Decrease the ideas_remaining count for free tier users
      if (profile?.subscription_tier === 'free') {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ ideas_remaining: Math.max(0, profile.ideas_remaining - 1) })
          .eq('id', user.id);
          
        if (profileError) throw profileError;
      }
      
      toast.success('Analysis completed!');
      navigate(`/results/${ideaData.id}`);
      
    } catch (error) {
      console.error('Error analyzing idea:', error);
      toast.error('An error occurred while analyzing your idea');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <Layout>
      <div className="container-width">
        <div className="max-w-4xl mx-auto py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Your Business Idea
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Get comprehensive AI-powered validation in just moments.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-medium p-6 md:p-10 border border-gray-200 dark:border-gray-800">
            <IdeaAnalyzerForm onSubmit={handleIdeaSubmit} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyzePage;
