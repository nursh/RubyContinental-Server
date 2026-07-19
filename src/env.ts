import { z, ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())


const EnvSchema = z.object({
  DB_URL: z.string(),
  PORT: z.coerce.number().default(3000)
})

export type Env = z.infer<typeof EnvSchema>
let env: Env;

try {
  env = EnvSchema.parse(process.env)
} catch(err) {
  const error = err as ZodError
  console.error('Invalid env file')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default env