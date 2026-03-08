"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import touse from "../../public/to-use.jpg";

const ALL_BLOG = gql`
  query AllBlog {
    allblog {
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

const categoryPillColors: Record<string, string> = {
  Technology: "bg-blue-500",
  Design: "bg-purple-500",
  Lifestyle: "bg-green-500",
  Food: "bg-orange-500",
  Travel: "bg-pink-500",
  Health: "bg-teal-500",
};

function formatDate(isoString: string | undefined): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LatestArticles() {
  const { data, loading, error } = useQuery<{
    allblog: Array<{
      id: string;
      title: string;
      excerpt: string;
      author: string;
      category: string;
      image: string;
      createdAt?: string;
      content?: string;
    }>;
  }>(ALL_BLOG);

  const getReadTimeFromContent = (content: string | undefined): string => {
    if (!content) return "5 min read";
    const mins = Math.max(1, Math.round(content.length / 200));
    return `${mins} min read`;
  };

  if (loading) {
    return (
      <section className="max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px] py-16 md:py-20">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-gray-600 text-lg font-light">
              Fresh perspectives on topics that matter
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-gray-50 h-80 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px] py-16 md:py-20">
        <div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-2">
            Latest Articles
          </h2>
          <p className="text-red-600">Failed to load articles. Please try again later.</p>
        </div>
      </section>
    );
  }

  const articles = data?.allblog ?? [];

  return (
    <section className="max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px] py-16 md:py-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-gray-600 text-lg font-light">
              Fresh perspectives on topics that matter
            </p>
          </div>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all shrink-0"
          >
            View All
            <HiOutlineArrowRight size={18} />
          </a>
        </div>
        {articles.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No articles yet. Publish your first post from the Add Blog page!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article) => {
              const initial = article.author?.charAt(0)?.toUpperCase() ?? "?";
              const readTime = getReadTimeFromContent(article.content);
              const imageSrc = article.image && article.image.startsWith("http")
                ? article.image
                : null;

              return (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <a href="#" className="block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <Image
                          src={touse}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <span
                          className={`rounded-full px-3 py-1 text-white text-xs font-medium ${categoryPillColors[article.category] ?? "bg-gray-500"}`}
                        >
                          {article.category}
                        </span>
                        <span className="text-gray-500">{readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold">
                            {initial}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {article.author}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(article.createdAt)}
                            </p>
                          </div>
                        </div>
                        <span className="text-gray-600 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more
                          <HiOutlineArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
