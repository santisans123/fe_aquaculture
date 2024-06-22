const withImages = require("next-images");
const removeImports = require("next-remove-imports")();
const withTM = require("next-transpile-modules")([]);
const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["id", "en"],
    defaultLocale: "id",
    localeDetection: false,
  },
  images: {
    domains: [
      "192.168.0.109",
      "localhost",
      "pascasarjana-s3.s3.ap-southeast-1.amazonaws.com",
    ],
    disableStaticImages: true,
  },
  distDir: "build",
};

// Menggabungkan semua plugin
module.exports = withPWA(withTM(withImages(removeImports(nextConfig))));
