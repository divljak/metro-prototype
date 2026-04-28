/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The lab API routes load typescript at runtime to scaffold draft
  // components. Externalize it so webpack doesn't try to bundle the
  // entire compiler into server output.
  experimental: {
    serverComponentsExternalPackages: ["typescript"],
  },
}

module.exports = nextConfig

