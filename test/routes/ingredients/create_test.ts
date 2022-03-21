import got from 'got'
import listen from 'test-listen'
import http from 'http'
import app from '../../../src/app'
import anyTest, {TestFn} from 'ava'
import { nanoid } from 'nanoid'
import Recipe from '../../../src/lib/recipe'

type ContextData = {
  server: http.Server
  prefix: string
}

const test = anyTest as TestFn<ContextData>

const ROUTE = 'api/ingredients'

test.before(async (t) => {
  const server = http.createServer(app)
  const prefix = await listen(server)

  t.context.server = server
  t.context.prefix = prefix
})

test.after.always((t) => {
  t.context.server.close()
})

test('should create ingredient successfully', async t => {
  const { prefix } = t.context

  const result = await got(ROUTE, {
    method: 'POST',
    prefixUrl: prefix,
    json: {
      name: 'Eggs',
      amount: 1,
    },
  }).json()

  t.like(result, {
    ingredient: {
      name: 'Eggs',
      amount: 1,
    }
  })
})

test('should create ingredient for recipe successfully', async t => {
  const { prefix } = t.context

  const title = nanoid()

  const recipe = await Recipe.create({
    title,
    cooking_time: 10,
    difficulty: 0,
  })

  const result: { ingredient: { id: string, name: string, amount: number, created_at: any } } = await got(ROUTE, {
    method: 'POST',
    prefixUrl: prefix,
    json: {
      name: 'Eggs',
      amount: 1,
      recipe_id: recipe.id
    },
  }).json()

  t.like(result, {
    ingredient: {
      name: 'Eggs',
      amount: 1,
    }
  })

  const updated_recipe = await Recipe.get(recipe.id)

  t.like(updated_recipe.toJSON(), {
    id: recipe.id,
    ingredients: [
      {
        created_at: new Date(result.ingredient.created_at),
        id: result.ingredient.id,
        name: result.ingredient.name,
        amount: result.ingredient.amount
      }
    ]
  })
})

test('should send error if not all required fields are filled', async t => {
  const { prefix } = t.context

  try {
    await got(ROUTE, {
      method: 'POST',
      prefixUrl: prefix,
      json: {
        amount: 1,
      },
    })
  } catch (e: any) {
    t.deepEqual(JSON.parse(e.response.body), {
      errors: [
        {
          location: 'body',
          message: 'invalid_name',
          param: 'name',
        },
        {
          location: 'body',
          message: 'invalid_name',
          param: 'name',
        },
      ],
    })
    t.is(e.response.statusCode, 400)
  }
})

test('should send error if recipe does not exist', async t => {
  const { prefix } = t.context

  try {
    await got(ROUTE, {
      method: 'POST',
      prefixUrl: prefix,
      json: {
        name: nanoid(),
        amount: 1,
        recipe_id: '18d5970f-1d12-4f7d-9e06-e5355f2d5ffe'
      },
    })
    t.fail()
  } catch (e: any) {
    t.deepEqual(JSON.parse(e.response.body), {
      errors: [
        {
          message: 'recipe_not_found',
        },
      ],
    })
    t.is(e.response.statusCode, 404)
  }
})
