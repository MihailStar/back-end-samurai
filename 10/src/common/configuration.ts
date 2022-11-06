import dotenv from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

const configuration = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  DATABASE_URL: url(),
  DATABASE_NAME: str(),
  SERVER_PORT: port(),
});

export { configuration };
