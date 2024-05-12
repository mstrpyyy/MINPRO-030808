const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      domains: ['daisyui.com'],
      remotePatterns: [
        {
          protocol: 'http', 
          hostname: 'localhost',
          port: '8000', 
          pathname: '/public/images/**',
        },
      ]
    },
  }
