import RegisterForm from '@/app/(auth)/register/register-form';

const Page = () => {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </main>
  );
};

export default Page;
