const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configura Metro para manejar archivos de imágenes
config.resolver.assetExts = [
  ...config.resolver.assetExts, // Extiende las extensiones predeterminadas
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
];

module.exports = config;