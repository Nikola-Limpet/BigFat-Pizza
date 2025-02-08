import userService from '@/services/user';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { clearTokenOfState } from '../redux/features/authSlice';
import { Button } from '@components/common/Button';
const Profile = () => {
  const dispatch = useDispatch();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
    onError: (error) => {
      if (error.status === 401) {
        dispatch(clearTokenOfState());
      }
    },
    refetchOnWindowFocus: false,

  });

  const handleLogout = () => {
    dispatch(clearTokenOfState());
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;


  return (
    <div className="min-h-screen bg-[#FFF5E6] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#C41E3A]">My Profile</h1>
          <Button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <p className="text-lg font-medium">{user?.name || user?.username}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;