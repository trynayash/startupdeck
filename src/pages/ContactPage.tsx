import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const initialState = { name: '', email: '', subject: '', message: '' };

const ContactPage = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields.');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Message sent successfully!');
        setForm(initialState);
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(data.error || 'Failed to send message.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-900 py-16 px-4 flex flex-col items-center justify-center">
      {/* Logo and Return Link */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
        <div className="flex items-center justify-center gap-4">
          <img src="/logo.svg" alt="StartupDeck Logo" className="w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-xl bg-white/10 p-2" />
          <Link to="/" className="text-base md:text-lg font-semibold text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1">
            <span className="text-2xl">&#8592;</span> Return to StartupDeck
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-3xl mx-auto text-center mb-12"
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-black text-white font-display mb-2">Get in touch</h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">We'd love to hear from you! Fill out the form and our team will get back to you soon.</p>
        </div>
      </motion.div>

      {/* Contact Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-8 border border-white/20 mb-10"
      >
        <form className="space-y-8" onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                className="peer rounded-lg px-4 py-4 bg-white/20 text-white placeholder-transparent border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none w-full"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <label htmlFor="name" className="absolute left-4 top-2 text-gray-300 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Full Name</label>
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="peer rounded-lg px-4 py-4 bg-white/20 text-white placeholder-transparent border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none w-full"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <label htmlFor="email" className="absolute left-4 top-2 text-gray-300 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Email</label>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="subject"
              id="subject"
              className="peer rounded-lg px-4 py-4 bg-white/20 text-white placeholder-transparent border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none w-full"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <label htmlFor="subject" className="absolute left-4 top-2 text-gray-300 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Subject</label>
          </div>
          <div className="relative">
            <textarea
              name="message"
              id="message"
              rows={5}
              className="peer rounded-lg px-4 py-4 bg-white/20 text-white placeholder-transparent border border-white/20 focus:ring-2 focus:ring-primary-500 outline-none w-full resize-none"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <label htmlFor="message" className="absolute left-4 top-2 text-gray-300 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm pointer-events-none">Your Message</label>
          </div>
          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-60 focus:ring-2 focus:ring-primary-500 focus:outline-none border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_16px_2px_rgba(99,102,241,0.5)]"
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px 4px #6366f1' }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="w-full max-w-2xl mx-auto text-center bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-2 text-white">Contact Information</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
            <a href="mailto:techyashu90@gmail.com" className="underline hover:text-primary-400">techyashu90@gmail.com</a>
          </div>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400"><path d="M22 16.92V19a2 2 0 0 1-2 2A17.91 17.91 0 0 1 3 5a2 2 0 0 1 2-2h2.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6.01 6.01l1.74-1.74a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"/></svg>
            <a href="tel:+919561713131" className="underline hover:text-primary-400">+91 9561713131</a>
          </div>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
            <span>Mumbai 400001, Maharashtra, India</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage; 