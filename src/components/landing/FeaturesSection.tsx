
import React from 'react';
import { 
  TrendingUp, 
  CodeSquare, 
  Activity, 
  Users, 
  Terminal,
  Presentation,
  Sparkles,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-purple-400" />,
    title: 'Market Potential Analysis',
    description: 'Get detailed TAM/SAM/SOM breakdowns, growth trends, and market size projections to understand your opportunity.',
    gradient: 'from-purple-500/20 to-blue-500/20',
    glow: 'group-hover:shadow-purple-500/25'
  },
  {
    icon: <CodeSquare className="h-8 w-8 text-cyan-400" />,
    title: 'Feature Recommendations',
    description: 'Receive prioritized MVP features and a strategic product roadmap to guide your development.',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    glow: 'group-hover:shadow-cyan-500/25'
  },
  {
    icon: <Users className="h-8 w-8 text-pink-400" />,
    title: 'Competitive Landscape Map',
    description: 'Identify direct and indirect competitors with a detailed positioning map to find your unique advantage.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    glow: 'group-hover:shadow-pink-500/25'
  },
  {
    icon: <Terminal className="h-8 w-8 text-blue-400" />,
    title: 'Tech Stack Recommendations',
    description: 'Get tailored technology recommendations with clear justification for your specific business needs.',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    glow: 'group-hover:shadow-blue-500/25'
  },
  {
    icon: <Presentation className="h-8 w-8 text-green-400" />,
    title: 'Auto-Generated Pitch Deck',
    description: 'Create a professional 10-slide pitch deck with key metrics and visualizations ready to share with investors.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    glow: 'group-hover:shadow-green-500/25'
  },
  {
    icon: <Activity className="h-8 w-8 text-orange-400" />,
    title: 'Ongoing Validation',
    description: 'Track market changes and update your analysis as your business evolves and grows over time.',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    glow: 'group-hover:shadow-orange-500/25'
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative bg-slate-900 section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/20 rounded-full animate-float-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container-width relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            Comprehensive Validation Suite
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Everything You Need to
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Validate Your Ideas
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get all the insights you need to validate and refine your business idea in one powerful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-4xl transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-slide-in-up ${feature.glow}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex rounded-xl p-4 bg-white/10 backdrop-blur-sm border border-white/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Floating icon */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 animate-bounce-gentle">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
