import AuthForm from "../components/auth/AuthForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-[#FFF5E6] flex items-center justify-center p-4">
      <AuthForm isLogin={false} />
    </div>
  );
};

export default Register;