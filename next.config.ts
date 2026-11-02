import type { NextConfig } from 'next';
const staticExport = process.env.STATIC_EXPORT === '1';
const config: NextConfig = {
  poweredByHeader: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  ...(staticExport ? { output: 'export', trailingSlash: true } : {
    async headers() {
      return [{ source: '/:path*', headers: [
        {key:'X-Content-Type-Options',value:'nosniff'},
        {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
        {key:'X-Frame-Options',value:'DENY'},
      ] }];
    },
  }),
};
export default config;
