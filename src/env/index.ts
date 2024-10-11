import { z } from 'zod'

const envSchema = z.object({
  SERVER_URL: z.string().url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error(
    'Invalid environment variables' + _env.error.message.toString(),
  )
}

const env = _env.data

export default env
