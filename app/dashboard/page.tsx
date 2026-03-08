"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FiSearch, FiEdit2, FiExternalLink } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client/react";
import { RiDeleteBin6Line } from "react-icons/ri";




const GET_BLOGS = gql`
  query GetBlogs {
    allblog {
      id
      title
      author
      category
      image
      createdAt
    }
  }
`;



const Dashboard = () => {
  const [userName, setUserName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_BLOGS);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUserName(parsed?.name || "");
        } catch {
          setUserName("");
        }
      }
    }
  }, []);

  const filteredBlogs =
    data?.allblog?.filter((post: any) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        post.title?.toLowerCase().includes(term) ||
        post.author?.toLowerCase().includes(term) ||
        post.category?.toLowerCase().includes(term)
      );
    }) ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top dashboard navbar */}
      <header className="w-full border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <MdOutlineLibraryBooks size={22} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Blog Dashboard
              </h1>
              <p className="text-xs text-slate-500">Manage your content</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {userName && (
              <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-700 hover:bg-slate-100 transition">
                <span className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
                <span className="truncate max-w-[140px]">{userName}</span>
              </button>
            )}

            <Link href="/">
              <button className="px-3 md:px-4 py-1.5 text-xs md:text-sm rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition">
                Home
              </button>
            </Link>

            <Link href="/addblog">
              <button className="px-3 md:px-5 py-1.5 text-xs md:text-sm rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium shadow-sm hover:shadow-md hover:brightness-105 transition">
                + New Post
              </button>
            </Link>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("user");
                }
                router.push("/");
              }}
              className="px-3 md:px-4 py-1.5 text-xs md:text-sm rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
            >
              <MdOutlineLogout />
            </button>
          </div>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Stat cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Posts</p>
              <p className="text-2xl font-semibold text-slate-900">{data?.allblog?.length}</p>
            </div>
            <span className="h-3 w-3 rounded-full bg-indigo-500" />
          </div>
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Categories</p>
              <p className="text-2xl font-semibold text-slate-900">6</p>
            </div>
            <span className="h-3 w-3 rounded-full bg-fuchsia-500" />
          </div>
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Authors</p>
              <p className="text-2xl font-semibold text-slate-900">{data?.allblog?.length}</p>
            </div>
            <span className="h-3 w-3 rounded-full bg-pink-500" />
          </div>
        </section>

        {/* Search bar */}
        <section>
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100 flex items-center gap-3 text-sm text-slate-500">
            <FiSearch className="h-4 w-4 text-slate-400" />
            <input
              className="w-full outline-none bg-transparent placeholder:text-slate-400"
              placeholder="Search posts by title, category, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* Posts table */}
        <section className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Posts Overview
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredBlogs.length} post
              {filteredBlogs.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="px-6 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Author</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Read Time</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Loading posts...
                    </td>
                  </tr>
                )}

                {error && !loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-red-500"
                    >
                      Error loading posts
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  filteredBlogs.map((post: any) => (
                    <tr
                      key={post.id}
                      className="border-t border-slate-100 hover:bg-slate-50/60"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-slate-200 overflow-hidden">
                            {post.image && (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <span className="text-slate-900 text-xs font-medium">
                            {post.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {post.author}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">5 min read</td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end items-center gap-3 text-slate-500">
                          <button className="p-1.5 rounded-md hover:bg-slate-100">
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100">
                          <RiDeleteBin6Line className="h-4 w-4"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {!loading && !error && filteredBlogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-slate-400"
                    >
                      No posts found for "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
