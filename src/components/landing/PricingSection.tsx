import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Rocket } from 'lucide-react';

const PricingSection = () => {
  return (
    <section id="pricing" className="relative bg-slate-900 section-padding overflow-hidden">
      {/* Background effects */}
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

      <div className="container-width relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Growth Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start validating your ideas today with our flexible pricing options. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-4xl transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-slide-in-up">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex rounded-xl p-4 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Rocket className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-gray-400 mb-6">Perfect for testing the waters</p>
              <div className="text-4xl font-bold text-white mb-6">
                Free
                <span className="text-lg font-normal text-gray-400">/forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['1 idea validation per month', 'Basic market analysis', 'Feature recommendations', 'Email support'].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-4xl transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex rounded-xl p-4 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Zap className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">For serious entrepreneurs</p>
              <div className="text-4xl font-bold text-white mb-6">
                $49
                <span className="text-lg font-normal text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['10 idea validations per month', 'Advanced market analysis', 'Competitor insights', 'Priority support', 'Custom feature recommendations', 'Pitch deck generation'].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                <Link to="/register?plan=pro">Start Free Trial</Link>
              </Button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-4xl transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex rounded-xl p-4 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-6">For teams and agencies</p>
              <div className="text-4xl font-bold text-white mb-6">
                Custom
                <span className="text-lg font-normal text-gray-400">/contact us</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Unlimited validations', 'Custom AI training', 'API access', 'Dedicated support', 'White-label reports', 'Team collaboration', 'Custom integrations'].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
};

export default PricingSection;
