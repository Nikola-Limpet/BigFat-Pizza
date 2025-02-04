import AuthForm from "../components/auth/AuthForm";


const Login = () => {
  return (
    <div className="min-h-screen bg-[#FFF5E6] flex items-center justify-center p-4">
      <AuthForm isLogin={true} />
    </div>
  );
};

export default Login;