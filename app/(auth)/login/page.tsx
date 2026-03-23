"use client";
import React, { useState } from "react";
import { LoginSchema, LoginSchemaType } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";

const LOGINUSER = gql`
  mutation Loginuser($email: String!, $password: String!) {
    loginuser(email: $email, password: $password) {
      user {
        email
        name
      }
      token
    }
  }
`;

const Loginpage = () => {
  const router = useRouter();
  const [loginuser, { loading, data }] = useMutation(LOGINUSER);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const LoginUser = async (value: LoginSchemaType) => {
    try {
      const { data } = await loginuser({
        variables: {
          email: value.email,
          password: value.password,
        },
      });
      console.log(data);

      // if (response.data?.loginuser) {
      //   if (typeof window !== "undefined") {
      //     localStorage.setItem("user", JSON.stringify(response.data.loginuser));
      //   }
      //   router.push("/");
      // }
      const response = await fetch("http://localhost:3000/api/setcookies", {
        method: "POST",
        body: JSON.stringify({ token: data?.loginuser?.token }),
      });
      console.log(response);
      if (response.status == 200) {
        const obj = {
          isAuthenticated: true,
        };
        localStorage.setItem("isSignedIn", JSON.stringify(obj));
        router.push("/");
      }
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9fafb] via-[#fef3f7] to-[#e0f2fe]">
      <header className="w-full flex justify-center pt-10">
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
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage your blog
            </p>
          </div>

          <form
            onSubmit={handleSubmit(LoginUser)}
            className="space-y-5"
            action=""
          >
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
                  placeholder="Enter your password"
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
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <span>Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Create Account
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

export default Loginpage;
