import express from 'express'
import { Model } from 'objection'
import knex from './lib/knex'
import api from './api'
import ApiError from './lib/error/api_error'
import Logger from './lib/logger'

Model.knex(knex)

const app = express()

app.use(express.json())

app.get('/api/healthcheck', (req, res) => {
  res.send({})
})

app.use((req, res, next) => {
  Logger.log('api', `[${req.method}] ${req.url}`)
  next()
})
app.use('/api', api)

app.use((req, res, next) => {
  throw new ApiError('not_found', 404)
})

app.use((err, req, res, next) => {
  if (process.env.SMS_ENV === 'development' || process.env.NODE_ENV !== 'production') {
    Logger.log('error', 'App received error', err)
  }

  if (err instanceof ApiError) {
    return res.status(err.status_code).send({
      errors: [
        { message: err.message },
      ],
    })
  }

  return res.status(500).send({
    errors: [
      { message: 'internal_error' },
    ],
  })
})

export default app
