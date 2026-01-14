import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  allowedDevOrigins: ["192.168.1.243", "localhost"],
  images: {
    unoptimized: true,
  },
  transpilePackages: ["next-mdx-remote"],
};
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
