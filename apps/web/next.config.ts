import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Workspace packages Next needs to transpile through its own TS pipeline.
  transpilePackages: ['@skyhub/api', '@skyhub/constants', '@skyhub/ui'],
}

export default nextConfig
