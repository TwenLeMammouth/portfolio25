import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Active Strict Mode pour React en développement
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,  // Ajoute la variable d'environnement accessible côté client
  },
  images: {
    domains: ['cdn.sanity.io'], // Ajoute ce domaine pour autoriser les images de Sanity
  },
};

export default nextConfig; 