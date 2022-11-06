import { createApp } from './app';
import { configuration } from './common/configuration';
import { connectDatabase } from './connection/database';
import { print } from './utility/print';
import { throwError } from './utility/throw-error';

const { DATABASE_NAME, SERVER_PORT, isDevelopment } = configuration;

/**
 * Bootstrap
 */
async function startServer(): Promise<void> {
  await connectDatabase(DATABASE_NAME);

  createApp().listen(SERVER_PORT, () => {
    const serverURL = `http://localhost:${SERVER_PORT}`;

    print(`✓ ${isDevelopment ? serverURL : ''}`);
  });
}

startServer().catch(throwError);
