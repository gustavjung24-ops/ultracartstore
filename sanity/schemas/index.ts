export const pageSchema = {
  name: "page",
  title: "Trang",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tiêu đề",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
    },
    {
      name: "content",
      title: "Nội dung chính",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Văn bản thay thế",
            },
          ],
        },
      ],
    },
    {
      name: "titleVi",
      title: "Tiêu đề (Tiếng Việt)",
      type: "string",
    },
    {
      name: "descriptionVi",
      title: "Mô tả ngắn (Tiếng Việt)",
      type: "text",
      rows: 3,
    },
    {
      name: "contentVi",
      title: "Nội dung chính (Tiếng Việt)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Văn bản thay thế",
            },
          ],
        },
      ],
    },
    {
      name: "image",
      title: "Hình ảnh đại diện",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Ngày xuất bản",
      type: "datetime",
    },
    {
      name: "updatedAt",
      title: "Cập nhật lần cuối",
      type: "datetime",
    },
  ],
};

export const articleSchema = {
  name: "article",
  title: "Bài viết",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tiêu đề",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Đoạn trích",
      type: "text",
      rows: 3,
    },
    {
      name: "content",
      title: "Nội dung",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Văn bản thay thế",
            },
          ],
        },
      ],
    },
    {
      name: "titleVi",
      title: "Tiêu đề (Tiếng Việt)",
      type: "string",
    },
    {
      name: "excerptVi",
      title: "Đoạn trích (Tiếng Việt)",
      type: "text",
      rows: 3,
    },
    {
      name: "contentVi",
      title: "Nội dung (Tiếng Việt)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Văn bản thay thế",
            },
          ],
        },
      ],
    },
    {
      name: "image",
      title: "Hình ảnh bìa",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "Tác giả",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "category",
      title: "Danh mục",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "tags",
      title: "Thẻ",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "publishedAt",
      title: "Ngày xuất bản",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "updatedAt",
      title: "Cập nhật lần cuối",
      type: "datetime",
    },
  ],
};

export const authorSchema = {
  name: "author",
  title: "Tác giả",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Tên",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "image",
      title: "Ảnh đại diện",
      type: "image",
    },
    {
      name: "bio",
      title: "Tiểu sử",
      type: "text",
      rows: 3,
    },
  ],
};

export const categorySchema = {
  name: "category",
  title: "Danh mục",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tiêu đề",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Mô tả",
      type: "text",
    },
  ],
};

export const schemaTypes = [
  pageSchema,
  articleSchema,
  authorSchema,
  categorySchema,
];
