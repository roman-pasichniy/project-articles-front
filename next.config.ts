import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "ac.goit.global", // <-- ось цей блок
=======
        hostname: "goit.global",
>>>>>>> b04af60c6df8788a93bd832ba8dfd571a37c1ffb
      },
    ],
  },
};

export default nextConfig;
