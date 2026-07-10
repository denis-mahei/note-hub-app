"use client";

import { useForm } from "react-hook-form";
import { AuthFormValues, authSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/lib/api/client-api";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

const RegisterForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      reset();
      router.push("/notes");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) toast.error(error.response?.data?.message);
        if (status === 500) toast.error("Something went wrong");
      }
    },
  });
  return (
    <div>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Sign Up</button>
      </form>
      <Link href="/login">Already have an account?</Link>
    </div>
  );
};

export default RegisterForm;
