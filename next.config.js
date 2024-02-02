/** @type {import('next').NextConfig} */
const nodeExternals = require('webpack-node-externals');
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['firebase-admin']
    }
}

module.exports = nextConfig
