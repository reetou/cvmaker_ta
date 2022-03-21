import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    message: error.msg,
    location: error.location,
    param: error.param,
    nested_errors: error.nestedErrors,
    value: error.value,
  }),
})

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = customValidationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return next()
}
