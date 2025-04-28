import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="max-w w-full space-y-8 bg-white rounded-lg shadow-md">
        <RegisterForm />
      </div>
    </div>
  );
}