import { drizzle } from 'drizzle-orm/node-postgres'
import env from '../env.ts'

const db = drizzle(env.DB_URL)
const result = await db.execute('select 1')
console.log(result)