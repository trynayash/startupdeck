// Developed by Yash Suthar – StartupDeck
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const magicLinkSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type MagicLinkFormValues = z.infer<typeof magicLinkSchema>;

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { signIn, signUp, signInWithGoogle, signInWithGitHub, signInWithMagicLink } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'magic'>('password');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const passwordForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const magicLinkForm = useForm<MagicLinkFormValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: '',
    },
  });

  const onPasswordSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await signUp(values.email, values.password);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onMagicLinkSubmit = async (values: MagicLinkFormValues) => {
    setIsMagicLinkLoading(true);
    try {
      await signInWithMagicLink(values.email);
      magicLinkForm.reset();
    } catch (error) {
      console.error('Magic link error:', error);
    } finally {
      setIsMagicLinkLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google signin error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    try {
      await signInWithGitHub();
    } catch (error) {
      console.error('GitHub signin error:', error);
    } finally {
      setIsGitHubLoading(false);
    }
  };

  const handleNavigationWithAnimation = (targetPath: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(targetPath);
    }, 150);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="mb-8 transform transition-all duration-700 ease-out">
            <h1 className="text-4xl font-bold text-white mb-4 animate-slide-in-up">
              Welcome to StartupDeck
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed animate-slide-in-up animation-delay-200">
              Transform your startup ideas into reality with our comprehensive analysis platform. 
              Get insights, validate your concepts, and build the future.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 transform transition-all duration-500 hover:translate-x-2">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 bg-primary rounded animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold">AI-Powered Analysis</h3>
                <p className="text-gray-400 text-sm">Get detailed insights on your startup ideas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 transform transition-all duration-500 hover:translate-x-2">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 bg-secondary rounded animate-pulse animation-delay-1000"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Market Research</h3>
                <p className="text-gray-400 text-sm">Understand your target market better</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 transform transition-all duration-500 hover:translate-x-2">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 bg-accent rounded animate-pulse animation-delay-2000"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Growth Strategy</h3>
                <p className="text-gray-400 text-sm">Plan your path to success</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className={`flex-1 flex items-center justify-center px-6 py-12 lg:px-12 transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="w-full max-w-md animate-slide-in-up">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {type === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-gray-600">
              {type === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Join thousands of entrepreneurs building their dreams'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full h-12 border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
              onClick={handleGitHubSignIn}
              disabled={isGitHubLoading}
            >
              {isGitHubLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Continue with GitHub
                </>
              )}
            </Button>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          {/* Auth Method Toggle for Login */}
          {type === 'login' && (
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setAuthMethod('password')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  authMethod === 'password'
                    ? 'bg-white text-gray-900 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('magic')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  authMethod === 'magic'
                    ? 'bg-white text-gray-900 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Magic Link
              </button>
            </div>
          )}

          {/* Forms */}
          {type === 'login' ? (
            authMethod === 'password' ? (
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Enter your password" 
                              className="h-12 border-gray-300 focus:border-primary focus:ring-primary pr-10"
                              {...field} 
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : 'Sign in to your account'}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...magicLinkForm}>
                <form onSubmit={magicLinkForm.handleSubmit(onMagicLinkSubmit)} className="space-y-4">
                  <FormField
                    control={magicLinkForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormDescription className="text-gray-600">
                    We'll send you a magic link for passwordless sign-in
                  </FormDescription>
                  <Button type="submit" className="w-full h-12 text-base" disabled={isMagicLinkLoading}>
                    {isMagicLinkLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : 'Send magic link'}
                  </Button>
                </form>
              </Form>
            )
          ) : (
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email" 
                          className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary pr-10"
                            {...field} 
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Confirm password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm your password" 
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary pr-10"
                            {...field} 
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : 'Create your account'}
                </Button>
              </form>
            </Form>
          )}

          {/* Footer Links with Animation */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {type === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => handleNavigationWithAnimation('/register')}
                    className="text-primary font-medium hover:text-primary/80 inline-flex items-center gap-1 hover:gap-2 transition-all duration-200"
                  >
                    Sign up for free
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => handleNavigationWithAnimation('/login')}
                    className="text-primary font-medium hover:text-primary/80 inline-flex items-center gap-1 hover:gap-2 transition-all duration-200"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
