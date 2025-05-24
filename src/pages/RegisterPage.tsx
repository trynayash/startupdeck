
// Developed by Yash Suthar – StartupDeck
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import LoadingScreen from '@/components/ui/loading-screen';
import { useAuth } from '@/contexts/AuthContext';

const RegisterPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Show loading screen briefly for smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !showContent) {
    return <LoadingScreen message="Loading registration page..." />;
  }

  return <AuthForm type="register" />;
};

export default RegisterPage;
