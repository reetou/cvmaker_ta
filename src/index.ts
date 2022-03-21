import app from './app'
import config from './config'
import Logger from './lib/logger'

app.listen(config.app.port, () => {
  Logger.log('main', `Application started at http://localhost:${config.app.port}`)
})
