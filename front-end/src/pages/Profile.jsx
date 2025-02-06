import { useSelector } from 'react-redux';

const Profile = () => {
  const data = useSelector((state) => state.auth);
  const user = data.user;
  console.log("User object in Profile:", user);


  return (
    <div className="min-h-screen bg-[#FFF5E6] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#C41E3A] mb-6">My Profile</h1>
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