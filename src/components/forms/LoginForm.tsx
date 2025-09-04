"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectPath }) => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<{email?: string, password?: string, auth?: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: {email?: string, password?: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Use the updated login function that returns role
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Store remember me preference if needed
        if (formData.rememberMe) {
          localStorage.setItem('rememberEmail', formData.email);
        } else {
          localStorage.removeItem('rememberEmail');
        }
        
        // Redirect based on user role
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          // Redirect based on role
          switch(result.role) {
            case 'parent':
              router.push('/dashboard');
              break;
            case 'child':
              router.push('/child-dashboard');
              break;
            case 'public':
            default:
              router.push('/dashboard');
              break;
          }
        }
      } else {
        // Handle login failure
        setErrors(prev => ({ ...prev, auth: 'Invalid email or password' }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ ...prev, auth: 'An error occurred during login' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.auth && (
        <div className="p-3 bg-[#FEE2E2] border border-[#FECACA] rounded-lg">
          <p className="text-sm text-[#EF4444]">{errors.auth}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#1F2937] mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`appearance-none block w-full px-4 py-3 border ${
            errors.email ? 'border-[#FECACA]' : 'border-[#D1D5DB]'
          } rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[#EF4444]">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-[#1F2937]">
            Password
          </label>
          <Link href="/forgot-password" className="text-sm text-[#4F46E5] hover:text-[#4338CA] font-medium">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          className={`appearance-none block w-full px-4 py-3 border ${
           errors.password ? 'border-[#FECACA]' : 'border-[#D1D5DB]'
         } rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]`}
          placeholder="••••••••"
        />
        {errors.password && (
         <p className="mt-1 text-sm text-[#EF4444]">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={handleChange}
         className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-[#D1D5DB] rounded"
        />
       <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#1F2937]">
          Remember me
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
         className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don&rsquo;t have an account?{' '}
         <Link href="/sign-up" className="text-[#4F46E5] hover:text-[#4338CA] font-medium">
            Sign up now
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;