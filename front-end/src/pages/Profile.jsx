import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#FFF5E6] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#C41E3A] mb-6">My Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <p className="text-lg font-medium">{user?.name}</p>
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