
import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    content: "StartupDeck helped me validate my SaaS idea in minutes. The competitive analysis was spot-on and saved me months of research.",
    author: "Sarah Johnson",
    role: "Founder, TechBridge",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    gradient: 'from-purple-500/20 to-pink-500/20',
    delay: '0ms'
  },
  {
    content: "I was skeptical about AI for business validation, but the market analysis was incredibly detailed and helped us pivot our strategy.",
    author: "Michael Chen",
    role: "CEO, NovaTech",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    gradient: 'from-cyan-500/20 to-blue-500/20',
    delay: '200ms'
  },
  {
    content: "The pitch deck generator alone is worth the subscription. It created a professional deck that impressed our angel investors.",
    author: "Emma Rodriguez",
    role: "Co-founder, GreenLife",
    rating: 4,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    gradient: 'from-green-500/20 to-teal-500/20',
    delay: '400ms'
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative bg-slate-900 section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <Star className="w-3 h-3 text-white/10" />
          </div>
        ))}
      </div>

      <div className="container-width relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            Customer Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Trusted by
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Entrepreneurs Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See what founders are saying about StartupDeck's business validation tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-4xl transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-slide-in-up`}
              style={{ animationDelay: testimonial.delay }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10 pt-4">
                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} className="h-5 w-5 text-gray-600" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-200 mb-8 italic leading-relaxed text-lg group-hover:text-white transition-colors">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white group-hover:text-white transition-colors">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-16 animate-fade-in animation-delay-1000">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Join 10,000+ successful entrepreneurs</span>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
