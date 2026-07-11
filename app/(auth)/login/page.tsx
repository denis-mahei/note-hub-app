import React from "react";
import LoginForm from "@/app/(auth)/login/login-form";

const Page = () => {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
};

export default Page;
