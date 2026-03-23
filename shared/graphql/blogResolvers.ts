import blogmodel from "../database/model/blog.model";
import cloudinary from "../lib/cloudinary";

type contexttype = {
  user?: {
    email: string;
    id: string;
    iat: number;
  };
};

type blog = {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image: string;
  createdAt: string;
};

type editblog = blog & { id: string };

export const blogresolvers = {
  Query: {
    allblog: async (
      _: unknown,
      { page, limit }: { page: number; limit: number },
    ) => {
      console.log(page);
      console.log(limit);

      const skip = (page - 1) * limit;
      const total = await blogmodel.countDocuments();
      const totalpages = Math.ceil(total / limit);

      const blogs = await blogmodel
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .skip(skip)
        .limit(limit);
      return blogs.map((b: Record<string, unknown>) => ({
        ...b,
        id: String(b._id),
        createdAt:
          b.createdAt instanceof Date
            ? (b.createdAt as Date).toISOString()
            : b.createdAt,
      }));
    },

    blog: async (_: unknown, param: { id: string }) => {
      return await blogmodel.findById(param.id);
    },

    allauthor: async () => {
      return await blogmodel.aggregate([
        {
          $group: {
            _id: "$author",
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
          },
        },
      ]);
    },
  },

  Mutation: {
    addblog: async (_: unknown, param: blog, context: contexttype) => {
      try {
        const { user } = context;
        console.log(user);
        if (!user) {
          throw new Error("invalid user");
        }

        const { title, content, excerpt, author, category, image } = param;
        if (!title || !content || !excerpt || !category || !image || !author) {
          throw new Error("All fields are mandatory");
        }

        const uploaded = await cloudinary.uploader.upload(image);
        if (uploaded) {
          const newBlog = await blogmodel.create({
            ...param,
            image: uploaded.secure_url,
          });
          console.log(newBlog);
          return newBlog;
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error?.message);
        }
      }
    },

    editblog: async (_: unknown, param: editblog, context: contexttype) => {
      try {
        const { user } = context;
        console.log(user);
        if (!user) {
          throw new Error("invalid user");
        }

        const { id, title, content, excerpt, author, category, image } = param;
        if (!title || !content || !excerpt || !category || !image || !author) {
          throw new Error("All fields are mandatory");
        }

        const existingblog = await blogmodel.findById(id);
        if (
          existingblog &&
          existingblog.author?.toLowerCase() != author.toLowerCase()
        ) {
          throw new Error("Author not authorized");
        }

        const uploaded = await cloudinary.uploader.upload(image);
        if (uploaded) {
          const updatedBlog = await blogmodel.findByIdAndUpdate(
            id,
            {
              ...param,
              image: uploaded.secure_url,
            },
            {
              returnDocument: "after",
            },
          );
          console.log(updatedBlog);
          return updatedBlog;
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error?.message);
        }
      }
    },

    deleteblog: async (_: unknown, param: { id: string }) => {
      try {
        await blogmodel.findByIdAndDelete(param.id);
        return param;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error?.message);
        }
      }
    },
  },
};
