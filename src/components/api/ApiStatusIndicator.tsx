
// Developed by Yash Suthar – StartupDeck
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, AlertCircle, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { startupDeckApi } from '@/services/startupDeckApi';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  responseTime?: number;
  lastChecked: Date;
}

const ApiStatusIndicator: React.FC = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Idea Analysis', status: 'operational', lastChecked: new Date() },
    { name: 'Feature Generation', status: 'operational', lastChecked: new Date() },
    { name: 'Market Analysis', status: 'operational', lastChecked: new Date() },
    { name: 'Tech Stack', status: 'operational', lastChecked: new Date() },
    { name: 'Pitch Deck', status: 'operational', lastChecked: new Date() },
    { name: 'File Storage', status: 'operational', lastChecked: new Date() },
  ]);
  
  const [isChecking, setIsChecking] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'operational' | 'degraded' | 'outage'>('operational');

  const checkServiceHealth = async () => {
    setIsChecking(true);
    const updatedServices: ServiceStatus[] = [];

    for (const service of services) {
      try {
        const startTime = Date.now();
        
        // Mock health checks - replace with actual health check endpoints
        switch (service.name) {
          case 'Idea Analysis':
            // await startupDeckApi.ideas.getHistory(1, 1);
            break;
          case 'Feature Generation':
            // await startupDeckApi.features.getRoadmap('test', '3months');
            break;
          case 'Market Analysis':
            // await startupDeckApi.market.getTrends({ industry: 'tech' });
            break;
          case 'Tech Stack':
            // await startupDeckApi.tech.compareStacks({ stacks: [], criteria: [] });
            break;
          case 'Pitch Deck':
            // await startupDeckApi.pitch.getTemplates();
            break;
          case 'File Storage':
            await startupDeckApi.assets.listFiles();
            break;
        }
        
        const responseTime = Date.now() - startTime;
        updatedServices.push({
          ...service,
          status: responseTime > 5000 ? 'degraded' : 'operational',
          responseTime,
          lastChecked: new Date(),
        });
      } catch (error) {
        updatedServices.push({
          ...service,
          status: 'outage',
          lastChecked: new Date(),
        });
      }
    }

    setServices(updatedServices);
    
    // Determine overall status
    const hasOutage = updatedServices.some(s => s.status === 'outage');
    const hasDegraded = updatedServices.some(s => s.status === 'degraded');
    
    if (hasOutage) {
      setOverallStatus('outage');
    } else if (hasDegraded) {
      setOverallStatus('degraded');
    } else {
      setOverallStatus('operational');
    }
    
    setIsChecking(false);
  };

  useEffect(() => {
    checkServiceHealth();
    const interval = setInterval(checkServiceHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      operational: 'bg-green-100 text-green-800',
      degraded: 'bg-yellow-100 text-yellow-800',
      outage: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">API Status</CardTitle>
          <div className="flex items-center gap-2">
            {overallStatus === 'operational' ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            {getStatusBadge(overallStatus)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {services.map((service, index) => (
          <div key={service.name}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(service.status)}
                <span className="text-sm font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {service.responseTime && (
                  <span>{service.responseTime}ms</span>
                )}
                <span>{service.lastChecked.toLocaleTimeString()}</span>
              </div>
            </div>
            {index < services.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
        
        <Separator className="my-4" />
        
        <Button
          variant="outline"
          size="sm"
          onClick={checkServiceHealth}
          disabled={isChecking}
          className="w-full"
        >
          {isChecking ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiStatusIndicator;
