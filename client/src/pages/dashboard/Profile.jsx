import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Note: Assuming update functionality might be added later or mocked for now
  // as it wasn't strictly detailed in the API docs provided initially.
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
        // Placeholder for API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Profile updated successfully (Mock)');
    } catch (error) {
        toast.error('Failed to update profile');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold border border-blue-200">
                {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800">{user?.name}</h3>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Active
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input 
            label="Full Name" 
            {...register('name')} 
          />
          <Input 
            label="Email Address" 
            type="email" 
            {...register('email')} 
            disabled // Email usually not editable easily
            className="bg-gray-50 cursor-not-allowed"
          />
          
          <div className="pt-2">
            <Button type="submit" isLoading={isLoading}>
                Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
