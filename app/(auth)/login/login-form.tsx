"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { AuthFormValues, authSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/api/client-api";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      router.push("/notes");
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
