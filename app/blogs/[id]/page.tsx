"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { gql } from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

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

const BlogDetail = () => {
  const { id: blogId } = useParams();
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_BLOG, {
    variables: {
      id: blogId,
    },
  });

  return (
    <div>
      {blogLoading ? (
        <>Loading</>
      ) : blogError ? (
        <>Error</>
      ) : (
        <>
          <p>{blogData.blog.title}</p>
          <p>{blogData.blog.excerpt}</p>
          <p>{blogData.blog.content}</p>
          <p>{blogData.blog.author}</p>
          <p>{blogData.blog.category}</p>
          <p>{blogData.blog.createdAt}</p>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
