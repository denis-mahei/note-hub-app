"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { AuthFormValues, authSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/lib/api/client-api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

const LoginForm = () => {
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
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      reset();
      router.push("/notes");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) toast.error("Invalid credentials");
        if (status === 500) toast.error("Something went wrong");
      }
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">login</button>
      </form>
      <Link href="/register">Don&apos;t have an account?</Link>
    </div>
  );
};

export default LoginForm;
