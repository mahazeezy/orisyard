import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from auto-writing AGENTS.md / CLAUDE.md into the repo.
  agentRules: false,
  async redirects() {
    return [
      { source: "/menu/cookies", destination: "/cookies", permanent: true },
      { source: "/menu/cakes", destination: "/custom-cakes", permanent: true },
      { source: "/menu/:category", destination: "/menu", permanent: true },
      { source: "/products/:slug", destination: "/menu", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/menu.html", destination: "/menu", permanent: true },
      { source: "/cart.html", destination: "/cart", permanent: true },
    ];
  },
};

export default nextConfig;
