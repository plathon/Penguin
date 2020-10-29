import dotenvFlow from 'dotenv-flow'
;(() => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  dotenvFlow.config()
})()
