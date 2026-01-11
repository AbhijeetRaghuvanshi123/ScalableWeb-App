import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../utils/validators';
import { loginUser } from '../../api/auth.api';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      login(response);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Please login to your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com"
            error={errors.email} 
            {...register('email')} 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            error={errors.password} 
            {...register('password')} 
          />
          
          <Button type="submit" isLoading={isLoading} className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
