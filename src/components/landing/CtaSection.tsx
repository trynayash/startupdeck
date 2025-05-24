
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Sparkles, Zap } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="relative bg-slate-900 section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
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

      <div className="container-width relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden animate-fade-in">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-cyan-900/50"></div>
            
            {/* Floating elements */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center animate-bounce-gentle">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-6 left-6 w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl flex items-center justify-center animate-bounce-gentle animation-delay-1000">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-1/2 right-12 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center animate-bounce-gentle animation-delay-2000">
              <Zap className="w-4 h-4 text-white" />
            </div>

            <div className="relative z-10 px-8 py-16 md:p-16 text-white text-center">
              <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium mb-6">
                <Rocket className="w-4 h-4 mr-2 text-orange-400" />
                Ready to Launch?
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Ready to Validate Your
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Next Big Idea?
                </span>
              </h2>
              
              <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of entrepreneurs using AI to test, refine, and perfect their business concepts. 
                Transform your ideas into market-ready strategies today.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button 
                  size="lg" 
                  asChild 
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <Link to="/analyze">
                    Analyze Your Idea Now 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold"
                >
                  <Link to="/signup">
                    Sign Up for Free
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-300">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span>Free to start</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  <span>Instant results</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span>10,000+ ideas validated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
};

export default CtaSection;
