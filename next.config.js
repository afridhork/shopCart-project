/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
}

module.exports = {
   async redirects() {
     return [
       {
         source: '/@/app/category/[slug]/page.tsx',
         destination: '/@/app/category/[...slug]/page.tsx',
         permanent: false,
       },
     ];
   },
}
