"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { gql } from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

const EDIT_BLOG = gql`
  mutation EditBlog(
    $id: ID
    $title: String!
    $content: String!
    $excerpt: String!
    $category: String!
    $image: String!
    $author: String!
  ) {
    editblog(
      id: $id
      title: $title
      content: $content
      excerpt: $excerpt
      category: $category
      image: $image
      author: $author
    ) {
      id
      title
      content
      excerpt
      category
      image
      author
    }
  }
`;

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

const GET_BLOG = gql`
  query GetBlog($id: ID!) {
    blog(id: $id) {
      id
      title
      excerpt
      content
      author
      category
      image
      createdAt
    }
  }
`;

const EditBlogPage = () => {
  const router = useRouter();
  const { id: blogId } = useParams();
  const [editBlog, { loading, error }] = useMutation(EDIT_BLOG);
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_BLOG, {
    variables: {
      id: blogId,
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    category: "Technology",
    readTime: "",
  });

  useEffect(() => {
    if (blogData?.blog) {
      setFormData(blogData.blog);
    }
  }, [blogData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await editBlog({
        variables: formData,
        refetchQueries: [{ query: GET_BLOGS }],
        awaitRefetchQueries: true,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar / navbar */}
      <header className="w-full border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow">
              <span className="text-lg font-semibold">B</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Update Post
              </h1>
              <p className="text-xs text-slate-500">
                Edit an existing blog post
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none"
          >
            ×
          </button>
        </div>
      </header>

      {/* Content card */}
      <main className="flex justify-center py-8 px-4">
        {blogLoading ? (
          <div className="">
            <p>Loading...</p>
          </div>
        ) : blogError || !blogData?.blog ? (
          <div className="">
            <p>Blog not found!.</p>
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-md border border-slate-100 px-10 py-8">
            <form className="space-y-6 text-sm" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter an engaging title for your post"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700">
                  Excerpt<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Write a brief summary that will appear in previews"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700">
                  Content<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Write your blog post content here..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              {/* Bottom fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Author */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700">
                      Author<span className="text-red-500">*</span>
                    </label>
                    <input
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      type="text"
                      placeholder="Your name"
                      disabled
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700">
                      Image URL
                    </label>
                    <input
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700">
                      Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleChange(
                          e as unknown as React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                          >,
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      <option>Technology</option>
                      <option>Design</option>
                      <option>Lifestyle</option>
                      <option>Food</option>
                      <option>Travel</option>
                      <option>Health</option>
                    </select>
                  </div>

                  {/* Read time */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700">
                      Read Time
                    </label>
                    <input
                      name="readTime"
                      value={formData.readTime}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(
                          e as unknown as React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                          >,
                        )
                      }
                      type="text"
                      placeholder="5 min read"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-105 transition"
                >
                  {loading ? "Updating..." : "Update Post"}
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditBlogPage;
