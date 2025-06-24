module.exports = {
  // O ambiente de teste que será usado para o Jest
  testEnvironment: 'node',

  // Um padrão que o Jest usa para detectar arquivos de teste
  testMatch: ['**/__tests__/**/*.test.js'],

  // Ignora a pasta de testes E2E, pois ela será rodada pelo Playwright
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],

  // Força o Jest a parar após a primeira falha, útil para CI
  bail: true,

  // Log verboso para cada teste individual
  verbose: true,
};