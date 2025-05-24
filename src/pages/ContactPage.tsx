import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const initialState = { name: '', email: '', subject: '', message: '' };

const ContactPage = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const maxMessageLength = 500;

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.name) newErrors.name = 'Full Name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.subject) newErrors.subject = 'Subject is required.';
    if (!form.message) newErrors.message = 'Message is required.';
    else if (form.message.length > maxMessageLength) newErrors.message = `Message must be under ${maxMessageLength} characters.`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
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
        setSuccess(true);
        toast.success('Message sent successfully!');
        setForm(initialState);
        setTimeout(() => {
          setSuccess(false);
          navigate('/');
        }, 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-900 py-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Gradient Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 2 }}
        />

        {/* Growth Chart */}
        <motion.div
          className="absolute left-[10%] top-[20%] w-32 h-32 opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 90 L30 70 L50 80 L70 40 L90 20" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="70" r="3" fill="#6366f1"/>
            <circle cx="50" cy="80" r="3" fill="#6366f1"/>
            <circle cx="70" cy="40" r="3" fill="#6366f1"/>
            <circle cx="90" cy="20" r="3" fill="#6366f1"/>
          </svg>
        </motion.div>

        {/* Rocket Ship */}
        <motion.div
          className="absolute right-[15%] top-[30%] w-24 h-24 opacity-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L60 30 L40 30 Z" fill="#6366f1"/>
            <rect x="45" y="30" width="10" height="40" fill="#6366f1"/>
            <path d="M30 70 L70 70 L60 90 L40 90 Z" fill="#6366f1"/>
            <path d="M35 70 L40 50 L60 50 L65 70" stroke="#6366f1" strokeWidth="2" fill="none"/>
          </svg>
        </motion.div>

        {/* Light Bulb */}
        <motion.div
          className="absolute left-[20%] bottom-[25%] w-20 h-20 opacity-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 C30 10 20 30 20 50 C20 70 35 85 50 85 C65 85 80 70 80 50 C80 30 70 10 50 10 Z" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <rect x="45" y="85" width="10" height="15" fill="#6366f1"/>
            <path d="M40 100 L60 100" stroke="#6366f1" strokeWidth="2"/>
          </svg>
        </motion.div>

        {/* Target/Bullseye */}
        <motion.div
          className="absolute right-[25%] bottom-[30%] w-28 h-28 opacity-20"
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 0.2, rotate: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="50" r="30" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="50" r="20" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="50" r="10" fill="#6366f1"/>
          </svg>
        </motion.div>

        {/* Code Brackets */}
        <motion.div
          className="absolute left-[30%] top-[40%] w-24 h-24 opacity-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20 L20 50 L30 80" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <path d="M70 20 L80 50 L70 80" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <path d="M40 40 L60 60" stroke="#6366f1" strokeWidth="2"/>
            <path d="M60 40 L40 60" stroke="#6366f1" strokeWidth="2"/>
          </svg>
        </motion.div>

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 + Math.random() * 2, delay: i * 0.2 }}
          />
        ))}

        {/* Animated Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Logo and Return Link */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8 z-10">
        <div className="flex items-center justify-center gap-4">
          <img src="/logo.svg" alt="StartupDeck Logo" className="w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-xl bg-white/10 p-2" />
          <Link to="/" className="text-base md:text-lg font-semibold text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1">
            <span className="text-2xl">&#8592;</span> Return to StartupDeck
          </Link>
        </div>
      </div>

      {/* Floating 3D Icon/Illustration */}
      <motion.div
        className="absolute right-8 top-24 z-10 hidden md:block"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="70" rx="30" ry="8" fill="#a5b4fc" fillOpacity="0.18"/>
          <rect x="35" y="25" width="10" height="30" rx="5" fill="#6366f1"/>
          <polygon points="40,10 45,25 35,25" fill="#a5b4fc"/>
          <rect x="38" y="45" width="4" height="8" rx="2" fill="#fbbf24"/>
          <ellipse cx="40" cy="55" rx="2.5" ry="1.5" fill="#fbbf24" fillOpacity="0.7"/>
        </svg>
      </motion.div>

      {/* Contact Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-8 border border-white/20 mb-10 z-10"
      >
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="rounded-full bg-green-500/20 p-6 mb-4 shadow-lg"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#22c55e" fillOpacity="0.2"/>
                  <path d="M16 24l6 6 10-10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <div className="text-xl font-bold text-green-400 mb-2">Thank you!</div>
              <div className="text-gray-200">Your message has been sent.</div>
            </motion.div>
          )}
        </AnimatePresence>
        {!success && (
        <form className="space-y-8" onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <input
                type="text"
                name="name"
                id="name"
                className={`peer rounded-lg px-4 py-4 bg-white/10 text-white placeholder-transparent border border-white/20 
                  focus:ring-2 focus:ring-primary-500 outline-none w-full transition-all duration-300
                  hover:bg-white/15 hover:border-primary-400/30
                  focus:bg-white/20 focus:border-primary-400
                  ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby="name-error"
              />
              <label 
                htmlFor="name" 
                className="absolute left-4 text-gray-300 text-sm transition-all duration-300 ease-out pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary-400
                  peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-primary-400
                  group-hover:text-primary-300 peer-focus:text-primary-400"
              >
                <span className="flex items-center gap-1">
                  <motion.svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 text-gray-400 peer-focus:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ scale: 1 }}
                    whileFocus={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </motion.svg>
                  Full Name
                </span>
              </label>
              {errors.name && (
                <motion.span 
                  id="name-error" 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1 block flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.name}
                </motion.span>
              )}
            </div>
            <div className="relative group">
              <input
                type="email"
                name="email"
                id="email"
                className={`peer rounded-lg px-4 py-4 bg-white/10 text-white placeholder-transparent border border-white/20 
                  focus:ring-2 focus:ring-primary-500 outline-none w-full transition-all duration-300 ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby="email-error"
              />
              <label 
                htmlFor="email" 
                className="absolute left-4 text-gray-300 text-sm transition-all duration-300 ease-out pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary-400
                  peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-primary-400
                  group-hover:text-primary-300 peer-focus:text-primary-400"
              >
                <span className="flex items-center gap-1">
                  <motion.svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 text-gray-400 peer-focus:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ scale: 1 }}
                    whileFocus={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </motion.svg>
                  Email
                </span>
              </label>
              {errors.email && (
                <motion.span 
                  id="email-error" 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1 block flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.email}
                </motion.span>
              )}
            </div>
          </div>
          <div className="relative group">
            <input
              type="text"
              name="subject"
              id="subject"
              className={`peer rounded-lg px-4 py-4 bg-white/10 text-white placeholder-transparent border border-white/20 
                focus:ring-2 focus:ring-primary-500 outline-none w-full transition-all duration-300 ${errors.subject ? 'border-red-400 focus:ring-red-400' : ''}`}
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              disabled={loading}
              required
              aria-invalid={Boolean(errors.subject)}
              aria-describedby="subject-error"
            />
            <label 
              htmlFor="subject" 
              className="absolute left-4 text-gray-300 text-sm transition-all duration-300 ease-out pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary-400
                peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-primary-400
                group-hover:text-primary-300 peer-focus:text-primary-400"
            >
              <span className="flex items-center gap-1">
                <motion.svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 text-gray-400 peer-focus:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </motion.svg>
                Subject
              </span>
            </label>
            {errors.subject && (
              <motion.span 
                id="subject-error" 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 block flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.subject}
              </motion.span>
            )}
          </div>
          <div className="relative group">
            <textarea
              name="message"
              id="message"
              rows={5}
              maxLength={maxMessageLength}
              className={`peer rounded-lg px-4 py-4 bg-white/10 text-white placeholder-transparent border border-white/20 
                focus:ring-2 focus:ring-primary-500 outline-none w-full resize-none transition-all duration-300 ${errors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              disabled={loading}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby="message-error message-counter"
            />
            <label 
              htmlFor="message" 
              className="absolute left-4 text-gray-300 text-sm transition-all duration-300 ease-out pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary-400
                peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-primary-400
                group-hover:text-primary-300 peer-focus:text-primary-400"
            >
              <span className="flex items-center gap-1">
                <motion.svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 text-gray-400 peer-focus:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 1 }}
                  whileFocus={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </motion.svg>
                Your Message
              </span>
            </label>
            <div className="flex justify-between items-center mt-1">
              {errors.message && (
                <motion.span 
                  id="message-error" 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.message}
                </motion.span>
              )}
              <span id="message-counter" className={`text-xs ml-auto ${form.message.length > maxMessageLength - 30 ? 'text-yellow-300' : 'text-gray-400'}`}>{form.message.length}/{maxMessageLength}</span>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-60 focus:ring-2 focus:ring-primary-500 focus:outline-none border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_16px_2px_rgba(99,102,241,0.5)]"
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px 4px #6366f1' }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Sending...
              </span>
            ) : 'Send Message'}
          </motion.button>
        </form>
        )}
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="w-full max-w-4xl mx-auto bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-t-3xl p-8 border-t border-l border-r border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <div className="flex items-center gap-2 text-primary-400">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
              <h3 className="font-semibold text-white">Email Us</h3>
            </div>
            <a 
              href="mailto:techyashu90@gmail.com" 
              className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
            >
              <span className="relative">
                techyashu90@gmail.com
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 text-primary-400">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V19a2 2 0 0 1-2 2A17.91 17.91 0 0 1 3 5a2 2 0 0 1 2-2h2.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6.01 6.01l1.74-1.74a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"/></svg>
              <h3 className="font-semibold text-white">Call Us</h3>
            </div>
            <a 
              href="tel:+919561713120" 
              className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
            >
              <span className="relative">
                +91 9561713120
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center md:items-end gap-3"
          >
            <div className="flex items-center gap-2 text-primary-400">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
              <h3 className="font-semibold text-white">Visit Us</h3>
            </div>
            <span className="text-gray-300 text-center md:text-right">
              Mumbai 400001,<br />
              Maharashtra, India
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 pt-6 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} StartupDeck. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage; 