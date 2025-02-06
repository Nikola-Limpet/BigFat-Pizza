import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
import { Label } from "@components/common/Label";
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '@/redux/features/authSlice';
import { motion } from 'framer-motion';

// Schema from by zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

const registerSchema = loginSchema.extend({
  username: z.string().min(3, 'username must be at least 3 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

const AuthForm = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema)
  });

  // const onSubmit = async (data) => {
  //   const action = isLogin ? loginUser : registerUser;
  //   const result = await dispatch(action(data)); // action loginUser or registerUser

  //   if (result.meta.requestStatus === 'fulfilled') {
  //     navigate(isLogin ? '/' : '/profile');
  //   }
  // };
  const onSubmit = async (data) => {
    const action = isLogin ? loginUser : registerUser;
    const result = await dispatch(action(data));

    if (result.meta.requestStatus === 'fulfilled') {
      const destination = location.state?.from?.pathname || '/';
      navigate(destination, { replace: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-pacifico text-[#C41E3A] mb-2">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h1>
        <p className="text-[#6B4226]">
          {isLogin ? 'Sign in to continue' : 'Join our pizza family'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              {...register('username')}
              placeholder="Yuujin Andromeda"
              className={errors.username && 'border-red-500'}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="yuujin123@example.com"
            className={errors.email && 'border-red-500'}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
            className={errors.password && 'border-red-500'}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="••••••••"
              className={errors.confirmPassword && 'border-red-500'}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-[#C41E3A] hover:bg-[#A3172D] h-12 text-lg"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isLogin ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="text-center text-sm text-[#6B4226]">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-[#C41E3A] hover:underline">
                Register here
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-[#C41E3A] hover:underline">
                Sign in here
              </Link>
            </>
          )}
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#FFA726]/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#6B4226]">Or continue with</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#FFA726]/30 hover:bg-[#FFA726]/10"
            type="button"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Google
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#FFA726]/30 hover:bg-[#FFA726]/10"
            type="button"
          >
            <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
            Facebook
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AuthForm;