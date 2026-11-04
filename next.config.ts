import type { NextConfig } from "next";
import {trainingBasePath} from './lib/recruitment/paths';

const nextConfig: NextConfig = {
  basePath:trainingBasePath(),
  distDir:process.env.FORGE_TRAINING_BUILD==='true'?'.next-training':process.env.FORGE_BUILD_DIR||'.next',
  async redirects(){return trainingBasePath()?[{source:'/',destination:'/join/training',permanent:false}]:[];},
  reactStrictMode: true,
  // Managed Windows review sessions cannot always grant child build workers file access.
  // This local-only switch keeps the same build checks in the parent process.
  ...(process.env.FORGE_LOCAL_SERIAL_BUILD==='true'?{experimental:{webpackBuildWorker:false,workerThreads:true,cpus:2}}:{}),
  images: {
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920],
    qualities: [75],
  },
  trailingSlash: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ]
      }
    ]
  }
};

export default nextConfig;
