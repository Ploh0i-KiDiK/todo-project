module.exports = {
  testEnvironment: 'jsdom',
  // Ищем тесты во всех .test.jsx/.test.js файлах
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    // Мокаем импорты стилей, чтобы Jest не падал
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Мокаем svg-иконки как пустые модули в тестах
    '\\.svg$': '<rootDir>/src/test/__mocks__/svgMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};

