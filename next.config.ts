import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from auto-writing AGENTS.md / CLAUDE.md into the repo.
  agentRules: false,
};

export default nextConfig;
