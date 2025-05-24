
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Presentation, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BusinessIdea {
  id: string;
  idea_text: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchIdeas();
    }
  }, [user]);

  const fetchIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from('business_ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setIdeas(data || []);
    } catch (error) {
      console.error('Error fetching ideas:', error);
      toast.error('Failed to fetch your ideas');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredIdeas = ideas.filter(idea => 
    idea.idea_text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewIdea = () => {
    navigate('/analyze');
  };

  const handleViewResults = (ideaId: string) => {
    navigate(`/results/${ideaId}`);
  };

  return (
    <Layout>
      <div className="container-width py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your business ideas and analyses
            </p>
          </div>
          <div>
            <Button onClick={handleNewIdea}>
              <Plus className="mr-2 h-4 w-4" /> New Idea
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Your current plan and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Current Plan</p>
                    <p className="text-2xl font-bold capitalize">
                      {profile?.subscription_tier || 'Free'}
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Ideas Remaining</p>
                    <p className="text-2xl font-bold">
                      {profile?.ideas_remaining || 0}
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Total Ideas</p>
                    <p className="text-2xl font-bold">{ideas.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Business Ideas</CardTitle>
                  <CardDescription>
                    Review and manage your previous analyses
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search ideas..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading your ideas...</div>
              ) : filteredIdeas.length === 0 ? (
                <div className="text-center py-8">
                  {searchQuery ? (
                    <p>No ideas match your search.</p>
                  ) : (
                    <div>
                      <p className="mb-4">You haven't created any business ideas yet.</p>
                      <Button onClick={handleNewIdea}>
                        <Plus className="mr-2 h-4 w-4" /> Create Your First Idea
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium line-clamp-1">{idea.idea_text}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewResults(idea.id)}
                        >
                          <Presentation className="h-4 w-4 mr-2" />
                          View Analysis
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Created on {new Date(idea.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
