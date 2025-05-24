
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Sparkles, Zap, Target } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/30 rounded-full animate-float-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container-width relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-4 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              AI-Powered Business Validation
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-slide-in-up">
              Validate Your
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-glow">
                Startup Ideas
              </span>
              in Minutes
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 animate-slide-in-up animation-delay-200">
              Transform your business concepts into market-ready strategies with our AI-powered validation platform. Get instant insights, competitive analysis, and actionable recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-in-up animation-delay-300">
              <Button size="lg" asChild className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                <Link to="/analyze">
                  Start Validating Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold">
                <a href="#features">
                  Watch Demo
                </a>
              </Button>
            </div>
            
            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-gray-300 animate-slide-in-up animation-delay-400">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Right side - 3D Animated Dashboard */}
          <div className="relative lg:h-[700px] flex items-center justify-center animate-fade-in animation-delay-600">
            <div className="relative w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500">
              {/* Main dashboard mockup */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl animate-float">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-white/70 text-sm">StartupDeck AI</div>
                </div>

                {/* Content sections */}
                <div className="space-y-6">
                  {/* Analysis score */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white font-semibold">Market Validation Score</div>
                      <Target className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">94%</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full w-[94%] animate-pulse"></div>
                    </div>
                  </div>

                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-white">$2.4B</div>
                      <div className="text-white/70 text-sm">Market Size</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-green-400">High</div>
                      <div className="text-white/70 text-sm">Potential</div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    {['AI Market Analysis', 'Competitor Insights', 'Feature Roadmap', 'Pitch Deck Ready'].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 text-white/80">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-bounce-gentle animation-delay-1000">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center animate-bounce-gentle animation-delay-2000">
                <Target className="w-6 h-6 text-white" />
              </div>

              <div className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
