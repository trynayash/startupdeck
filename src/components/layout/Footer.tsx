import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container-width py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                StartupDeck
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
              AI-powered business idea validation and analysis for entrepreneurs and innovators.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">Product</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li><a href="#features" className="hover:text-gray-900 dark:hover:text-gray-200">Features</a></li>
              <li><a href="#pricing" className="hover:text-gray-900 dark:hover:text-gray-200">Pricing</a></li>
              <li><Link to="/analyze" className="hover:text-gray-900 dark:hover:text-gray-200">Analyze Idea</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">Company</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-gray-900 dark:hover:text-gray-200">Testimonials</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">Legal</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} StartupDeck. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/trynayash" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/yxshsuthar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 md:mt-0">
            Built by Yash Suthar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
