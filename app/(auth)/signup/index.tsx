import React, { useState } from "react";
import { registerSchema, registerSchematype } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";


const CREATEUSER = gql`
  mutation createuser(
    $name: String!
    $email: String!
    $role: String!
    $password: String!
  ) {
    createuser(name: $name, email: $email, password: $password, role: $role) {
      name
      email
      role
    }
  }
`;

const SignupForm = () => {
  const router = useRouter();
  const [createuser, { loading, data }] = useMutation(CREATEUSER);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<registerSchematype>({
    resolver: zodResolver(registerSchema),
  });
  console.log(errors);

  const getPasswordStrength = (password: string): {
    label: string;
    color: string;
    textColor: string;
    width: number;
  } => {
    if (!password) {
      return {
        label: "Enter a password",
        color: "bg-slate-300",
        textColor: "text-slate-500",
        width: 0,
      };
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return {
        label: "Weak",
        color: "bg-red-400",
        textColor: "text-red-500",
        width: 33,
      };
    }

    if (score === 2) {
      return {
        label: "Medium",
        color: "bg-yellow-400",
        textColor: "text-yellow-500",
        width: 66,
      };
    }

    if (score === 3) {
      return {
        label: "Strong",
        color: "bg-green-500",
        textColor: "text-green-500",
        width: 90,
      };
    }

    return {
      label: "Very strong",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      width: 100,
    };
  };

  const passwordValue = watch("password") || "";
  const passwordStrength = getPasswordStrength(passwordValue);

  const RegisterUser = async (value: registerSchematype) => {
    const userinfo = {
      ...value,
      role: "user",
    };
    console.log(userinfo);
    try {
      const response = await createuser({ variables: userinfo });
      router.push("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9fafb] via-[#fef3f7] to-[#e0f2fe]">
      <header className="w-full mb-10 flex justify-center pt-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xl font-semibold shadow-md">
          <MdOutlineLibraryBooks size={"30px"} color="#fff" />
          </div>
          <span className="text-lg font-semibold text-slate-800">
            The Modern Blog
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur border border-slate-100 shadow-xl rounded-3xl px-8 py-10">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Join our community of writers
            </p>
          </div>

      <form
        onSubmit={handleSubmit(RegisterUser)}
            className="space-y-5"
        action=""
      >
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FiUser className="h-4 w-4" />
                </span>
          <input
            {...register("name")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            type="text"
                  placeholder="John Doe"
          />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
        </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FiMail className="h-4 w-4" />
                </span>
          <input
            {...register("email")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  type="email"
                  placeholder="your@email.com"
          />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
        </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FiLock className="h-4 w-4" />
                </span>
          <input
            {...register("password")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}

              <div className="mt-2">
                <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.width}%` }}
                  />
                </div>
                <p
                  className={`mt-1 text-xs font-medium ${passwordStrength.textColor}`}
                >
                  Password strength: {passwordStrength.label}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FiLock className="h-4 w-4" />
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-500">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
          >
            <span className="text-base leading-none">←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignupForm;
