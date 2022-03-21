
export type UserIntentionType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const TEST_PHONE = '+79054499498'

export const SMS_API_URL = process.env.SMS_API_URL || ''

export const V1_API_PREFIX = 'api/v1'

export const JWT_EXPIRES_IN = '365d'

export const MULTER_UPLOADS_DESTINATION_DIRECTORY = 'tmp/uploads'

export const DEFAULT_MULTER_OPTIONS = {
  dest: MULTER_UPLOADS_DESTINATION_DIRECTORY,
}

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'HBCoJw0HYhJL8uC4v3vz9CxfXde1h1C'
