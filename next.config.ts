import type { NextConfig } from "next";
import {trainingBasePath} from './lib/recruitment/paths';

const nextConfig: NextConfig = {
  basePath:trainingBasePath(),
  distDir:process.env.FORGE_TRAINING_BUILD==='true'?'.next-training':'.next',
  async redirects(){return trainingBasePath()?[{source:'/',destination:'/join/training',permanent:false}]:[];},
  reactStrictMode: true,
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
