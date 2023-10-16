/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
}

module.exports = {
   async redirects() {
     return [
       {
         source: '/category/[slug]/page.tsx',
         destination: '/category/[...slug]/page.tsx',
         permanent: false,
       },
     ];
   },
}
