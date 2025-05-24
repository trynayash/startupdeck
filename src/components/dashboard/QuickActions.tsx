
// Developed by Yash Suthar – StartupDeck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  TrendingUp, 
  Code, 
  Presentation, 
  FileText,
  Zap,
  Users,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions: QuickAction[] = [
    {
      id: 'analyze-idea',
      title: 'Analyze New Idea',
      description: 'Get AI-powered analysis of your business concept',
      icon: Lightbulb,
      action: () => navigate('/analyze'),
      badge: 'Popular',
      badgeVariant: 'default',
    },
    {
      id: 'generate-features',
      title: 'Generate Features',
      description: 'Create feature sets and roadmaps for your product',
      icon: Zap,
      action: () => console.log('Generate Features'),
      badge: 'New',
      badgeVariant: 'secondary',
    },
    {
      id: 'market-research',
      title: 'Market Research',
      description: 'Analyze market size, competitors, and trends',
      icon: TrendingUp,
      action: () => console.log('Market Research'),
    },
    {
      id: 'tech-stack',
      title: 'Tech Stack Advisor',
      description: 'Get MVP technology recommendations',
      icon: Code,
      action: () => console.log('Tech Stack'),
    },
    {
      id: 'pitch-deck',
      title: 'Create Pitch Deck',
      description: 'Generate investor-ready presentations',
      icon: Presentation,
      action: () => console.log('Pitch Deck'),
      badge: 'Pro',
      badgeVariant: 'outline',
    },
    {
      id: 'customer-personas',
      title: 'Customer Personas',
      description: 'Define your target audience segments',
      icon: Users,
      action: () => console.log('Customer Personas'),
    },
    {
      id: 'business-plan',
      title: 'Business Plan',
      description: 'Create comprehensive business documentation',
      icon: FileText,
      action: () => console.log('Business Plan'),
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Track your startup journey progress',
      icon: BarChart3,
      action: () => console.log('Analytics'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
        <Badge variant="outline">{quickActions.length} tools available</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <Card 
              key={action.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-primary/20"
              onClick={action.action}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  {action.badge && (
                    <Badge variant={action.badgeVariant} className="text-xs">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{action.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {action.description}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.action();
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-muted">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Pro Tip</h3>
            <p className="text-sm text-muted-foreground">
              Start with analyzing your business idea to unlock all other features and get personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
