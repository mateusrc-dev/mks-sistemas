/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: [
      "mks-sistemas.nyc3.digitaloceanspaces.com", // precisamos desse domínio para as imagens funcionarem no next
    ]
  },
}

module.exports = nextConfig
