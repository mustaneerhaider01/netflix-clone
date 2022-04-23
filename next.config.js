const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'rb.gy'],
  },
})
