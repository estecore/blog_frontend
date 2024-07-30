import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "dev-to-uploads.s3.amazonaws.com",
      process.env.IMAGE_URL,
    ],
  },
};

export default nextConfig;
