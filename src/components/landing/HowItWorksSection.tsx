import React from 'react';
import { ArrowRight, Sparkles, Target, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Enter Your Idea',
    description: 'Simply input your business idea in a single sentence or short paragraph.',
    icon: <Sparkles className="w-6 h-6 text-white" />,
    gradient: 'from-purple-500 to-blue-500',
    delay: '0ms'
  },
  {
    number: '02',
    title: 'AI Analysis Runs',
    description: 'Our AI engine processes your idea against market data, trends, and patterns.',
    icon: <Target className="w-6 h-6 text-white" />,
    gradient: 'from-cyan-500 to-teal-500',
    delay: '200ms'
  },
  {
    number: '03',
    title: 'Review Insights',
    description: 'Get comprehensive analysis across five key business dimensions.',
    icon: <Zap className="w-6 h-6 text-white" />,
    gradient: 'from-pink-500 to-rose-500',
    delay: '400ms'
  },
  {
    number: '04',
    title: 'Refine & Export',
    description: 'Download reports, share with your team, and iterate on your idea.',
    icon: <CheckCircle2 className="w-6 h-6 text-white" />,
    gradient: 'from-green-500 to-emerald-500',
    delay: '600ms'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

      <div className="container-width relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
            <Target className="w-4 h-4 mr-2 text-cyan-400" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            How StartupDeck
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Works for You
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform validates your business ideas in four simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative group animate-slide-in-up"
                style={{ animationDelay: step.delay }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-4xl transition-all duration-500 hover:scale-105 hover:bg-white/10 h-full flex flex-col">
                  {/* Step number */}
                  <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${step.gradient} text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                    
                    {/* Floating icon */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce-gentle">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors flex-grow leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-32 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                        <ArrowRight className="h-4 w-4 text-white/60" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in animation-delay-1000">
          <Link to="/register" className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors cursor-pointer">
            <span>Ready to get started?</span>
            <ArrowRight className="w-4 h-4 animate-bounce-gentle" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
