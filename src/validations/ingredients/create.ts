import { checkSchema } from 'express-validator'

const createIngredientSchema = checkSchema({
  name: {
    in: ['body'],
    errorMessage: 'invalid_name',
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 512,
      },
    },
  },
  amount: {
    in: ['body'],
    errorMessage: 'invalid_amount',
    isInt: {
      options: {
        min: 0,
      },
    },
  },
  recipe_id: {
    in: ['body'],
    errorMessage: 'invalid_recipe_id',
    optional: true,
    isUUID: true,
  }
})

export default createIngredientSchema
