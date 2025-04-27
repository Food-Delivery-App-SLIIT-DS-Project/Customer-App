import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}