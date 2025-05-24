
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Share2, Presentation, BarChart2, Layers, Activity, PieChart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AnalysisSection {
  section_type: string;
  content: any;
}

interface BusinessIdea {
  id: string;
  idea_text: string;
  created_at: string;
}

const ResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [idea, setIdea] = useState<BusinessIdea | null>(null);
  const [sections, setSections] = useState<Record<string, any>>({});

  useEffect(() => {
    if (id) {
      fetchAnalysis(id);
    }
  }, [id]);

  const fetchAnalysis = async (ideaId: string) => {
    try {
      // Fetch the business idea
      const { data: ideaData, error: ideaError } = await supabase
        .from('business_ideas')
        .select('*')
        .eq('id', ideaId)
        .single();
      
      if (ideaError) throw ideaError;
      setIdea(ideaData);

      // Fetch all analysis sections for this idea
      const { data: analysisData, error: analysisError } = await supabase
        .from('analyses')
        .select('section_type, content')
        .eq('business_idea_id', ideaId);
      
      if (analysisError) throw analysisError;

      // Organize sections into an object by type
      const organizedSections: Record<string, any> = {};
      analysisData.forEach((section: AnalysisSection) => {
        organizedSections[section.section_type] = section.content;
      });
      
      setSections(organizedSections);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      toast.error('Failed to load analysis');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-width py-16 md:py-24 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-xl">Loading analysis results...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!idea) {
    return (
      <Layout>
        <div className="container-width py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Analysis not found</h2>
            <p className="mb-6">The analysis you're looking for doesn't exist or you don't have permission to view it.</p>
            <Button asChild>
              <a href="/analyze">Create a New Analysis</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getIconForSection = (section: string) => {
    switch (section) {
      case 'market':
        return <BarChart2 className="h-4 w-4" />;
      case 'features':
        return <Layers className="h-4 w-4" />;
      case 'competitors':
        return <Activity className="h-4 w-4" />;
      case 'techStack':
        return <PieChart className="h-4 w-4" />;
      case 'pitchDeck':
        return <Presentation className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getSectionLabel = (section: string) => {
    switch (section) {
      case 'market':
        return 'Market Analysis';
      case 'features':
        return 'Features';
      case 'competitors':
        return 'Competitors';
      case 'techStack':
        return 'Tech Stack';
      case 'pitchDeck':
        return 'Pitch Deck';
      default:
        return section;
    }
  };

  // Render section content based on type
  const renderSectionContent = (section: string) => {
    const content = sections[section];
    
    if (!content) return <p>No data available for this section.</p>;
    
    switch (section) {
      case 'market':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">{content.summary}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Addressable Market</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-2xl font-bold">{content.tam}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Serviceable Available Market</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-2xl font-bold">{content.sam}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Serviceable Obtainable Market</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-2xl font-bold">{content.som}</p>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Growth Rate</h3>
              <p className="text-gray-700 dark:text-gray-300">{content.growthRate}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Target Audience</h3>
              <ul className="list-disc pl-5 space-y-1">
                {content.targetAudience.map((audience: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{audience}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Market Trends</h3>
              <ul className="list-disc pl-5 space-y-1">
                {content.trends.map((trend: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{trend}</li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'features':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">{content.summary}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">MVP Features</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {content.mvpFeatures.map((feature: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{feature.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            feature.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                            feature.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {feature.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Advanced Features</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {content.advancedFeatures.map((feature: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{feature.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            feature.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                            feature.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {feature.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'competitors':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">{content.summary}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Direct Competitors</h3>
              <div className="space-y-4">
                {content.directCompetitors.map((competitor: any, index: number) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle>{competitor.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Strengths</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {competitor.strengths.map((strength: string, i: number) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300">{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Weaknesses</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {competitor.weaknesses.map((weakness: string, i: number) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300">{weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Indirect Competitors</h3>
              <div className="space-y-4">
                {content.indirectCompetitors.map((competitor: any, index: number) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle>{competitor.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Strengths</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {competitor.strengths.map((strength: string, i: number) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300">{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Weaknesses</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {competitor.weaknesses.map((weakness: string, i: number) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300">{weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Key Differentiators</h3>
              <ul className="list-disc pl-5 space-y-1">
                {content.differentiators.map((diff: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{diff}</li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'techStack':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">{content.summary}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frontend</CardTitle>
                  <CardDescription>Recommended technologies for the user interface</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {content.frontend.map((tech: string, index: number) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{tech}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Backend</CardTitle>
                  <CardDescription>Recommended technologies for the server and data layer</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {content.backend.map((tech: string, index: number) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{tech}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Infrastructure</CardTitle>
                  <CardDescription>Recommended technologies for deployment and operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {content.infrastructure.map((tech: string, index: number) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{tech}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Technical Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                {content.considerations.map((consideration: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{consideration}</li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'pitchDeck':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">{content.summary}</p>
            </div>
            
            <div className="space-y-6">
              {content.slides.map((slide: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Slide {index + 1}: {slide.title}</CardTitle>
                      <span className="text-xs text-muted-foreground">{index + 1}/{content.slides.length}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{slide.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline" disabled>
                <Download className="mr-2 h-4 w-4" /> Download Full Deck (Coming Soon)
              </Button>
            </div>
          </div>
        );
        
      default:
        return <p>No data available for this section.</p>;
    }
  };

  return (
    <Layout>
      <div className="container-width py-16 md:py-20">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(idea.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
          <div className="bg-muted p-4 md:p-6 rounded-lg mb-8">
            <h2 className="font-semibold mb-2">Business Idea</h2>
            <p className="text-lg">{idea.idea_text}</p>
          </div>
        </div>
        
        <Tabs defaultValue="market" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.keys(sections).map(section => (
              <TabsTrigger key={section} value={section} className="flex items-center">
                {getIconForSection(section)}
                <span className="ml-2">{getSectionLabel(section)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(sections).map(section => (
            <TabsContent key={section} value={section} className="focus:outline-none">
              <Card>
                <CardHeader>
                  <CardTitle>{sections[section].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSectionContent(section)}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResultsPage;
