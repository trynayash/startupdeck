import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is StartupDeck?',
    answer: 'StartupDeck is an AI-powered platform that helps you validate business ideas, analyze markets, and generate pitch decks in minutes.'
  },
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our AI leverages the latest market data and advanced algorithms to provide actionable insights, but we always recommend further research for critical decisions.'
  },
  {
    question: 'Can I use StartupDeck for free?',
    answer: 'Yes! Our Starter plan is free forever and lets you validate one idea per month.'
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'You can upgrade anytime from your dashboard. Just click on "Upgrade Plan" and follow the instructions.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption and never share your data with third parties.'
  },
  {
    question: 'Can I invite my team to collaborate?',
    answer: 'Yes, our Pro and Enterprise plans allow you to invite team members and collaborate on idea validation and reports.'
  },
  {
    question: 'What support options are available?',
    answer: 'We offer email support for all users, with priority and dedicated support for Pro and Enterprise customers.'
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900 section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      <div className="container-width relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
            <HelpCircle className="w-4 h-4 mr-2 text-blue-400" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Got Questions?
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Here are answers to some of the most common questions about StartupDeck.
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-4 animate-fade-in animation-delay-500">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg overflow-hidden transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left font-display text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-primary-500 group"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{faq.question}</span>
                <span className="ml-4">
                  {openIndex === idx ? (
                    <ChevronUp className="w-6 h-6 text-primary-400 transition-transform duration-300 rotate-180" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary-400 transition-transform duration-300" />
                  )}
                </span>
              </button>
              <div
                className={`px-6 pb-5 text-gray-300 text-base transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                style={{
                  transitionProperty: 'max-height, opacity',
                }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 