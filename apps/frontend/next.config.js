/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  experimental: {
    runtime: 'edge',
  }
}

module.exports = nextConfig
