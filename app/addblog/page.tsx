"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

const ADD_BLOG = gql`
  mutation AddBlog(
    $title: String!
    $content: String!
    $excerpt: String!
    $category: String!
    $image: String!
    $author: String!
  ) {
    addblog(
      title: $title
      content: $content
      excerpt: $excerpt
      category: $category
      image: $image
      author: $author
    ) {
      id
      title
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

const GET_AUTHORS = gql`
  query GetAuthors {
    allauthor {
      name
    }
  }
`;

const AddBlogPage = () => {
  const router = useRouter();
  const [addBlog, { loading, error }] = useMutation(ADD_BLOG);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    category: "Technology",
    readTime: "",
  });

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
      await addBlog({
        variables: {
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          category: formData.category,
          image: formData.image,
          author: formData.author,
        },
        refetchQueries: [{ query: GET_BLOGS }, { query: GET_AUTHORS }],
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
              <h1 className="text-lg font-semibold text-slate-900">New Post</h1>
              <p className="text-xs text-slate-500">Create a new blog post</p>
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
                {loading ? "Publishing..." : "Publish Post"}
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
      </main>
    </div>
  );
};

export default AddBlogPage;
