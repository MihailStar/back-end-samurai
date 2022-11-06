import http from 'http';
import os from 'os';
import { handleRequest } from './handle-request';

const PORT = 3000;

http.createServer(handleRequest).listen(PORT, () => {
  process.stdout.write(`http://localhost:${PORT}${os.EOL}`);
});
