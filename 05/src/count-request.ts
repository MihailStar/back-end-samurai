import type { IncomingMessage } from 'http';

let requestСounter = 0;

function countRequest(request: IncomingMessage): number {
  if (request.url === '/favicon.ico') {
    return requestСounter;
  }

  return ++requestСounter;
}

export { countRequest };
