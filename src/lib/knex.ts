import Knex from 'knex'
import config from '../config'

const knex = Knex(config.knex)

export default knex
