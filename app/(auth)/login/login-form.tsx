"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { AuthFormValues } from "@/lib/schemas/auth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>();
  return <div></div>;
};

export default LoginForm;
