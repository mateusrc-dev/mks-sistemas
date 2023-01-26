/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: [
      'files.stripe.com', // precisamos desse domínio para as imagens funcionarem no next
    ]
  },
}

module.exports = nextConfig
