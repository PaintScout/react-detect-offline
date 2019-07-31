module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  globals: {
    'ts-jest': {
      tsConfig: 'test/tsconfig.json'
    }
  }
}
