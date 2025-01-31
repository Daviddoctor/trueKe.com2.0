module.exports = function (api) {
    api.cache(true); // Habilita el caching para mejorar el rendimiento
    return {
      presets: ['babel-preset-expo'], // Asegúrate de incluir este preset
      plugins: [
        'react-native-reanimated/plugin'// Plugin para react-native-reanimated
      ],
    };
  };