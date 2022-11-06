import { createApp } from './app';
import { configuration } from './common/configuration';
import { connectDatabase } from './connection/database';
import { print } from './utility/print';
import { throwError } from './utility/throw-error';

const { SERVER_PORT } = configuration;

async function startServer(): Promise<void> {
  await connectDatabase();

  createApp().listen(SERVER_PORT, () => {
    const serverURL = `http://localhost:${SERVER_PORT}`;

    print(`✓ ${serverURL}`);
  });
}

startServer().catch(throwError);
