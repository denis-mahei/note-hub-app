"use client";

import { useForm } from "react-hook-form";
import { AuthFormValues, authSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/lib/api/client-api";

const RegisterForm = () => {
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
  });
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      router.push("/notes");
    },
  });
  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
    </form>
  );
};

export default RegisterForm;
