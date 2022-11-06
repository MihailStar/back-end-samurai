import type { IncomingMessage, ServerResponse } from 'http';
// import fs from 'fs/promises';
import stream from 'stream/promises';
import fs from 'fs';
import path from 'path';
import httpStatus from 'http-status';
import { countRequest } from './count-request';
import { handleError } from './handle-error';
import { DataObject, stringifyObject } from './stringify-object';

function handleRequest(
  request: IncomingMessage,
  response: ServerResponse
): void {
  const counter = countRequest(request);

  try {
    if (request.url === '/favicon.ico') {
      // fs.readFile(path.join(__dirname, './favicon.ico'))
      //   .then((favicon) => {
      //     response.statusCode = httpStatus.OK;
      //     response.setHeader('Content-Type', 'image/x-icon');
      //     response.write(favicon);
      //     response.end();
      //   })
      //   .catch((error) => {
      //     handleError(error, response);
      //   });

      response.statusCode = httpStatus.OK;
      response.setHeader('Content-Type', 'image/x-icon');

      stream
        .pipeline(
          fs.createReadStream(path.join(__dirname, './favicon.ico')),
          response
        )
        .catch((error) => {
          handleError(error, response);
        });

      return;
    }

    const dataObject: DataObject = {
      host: request.headers.host ?? 'unknown',
      url: request.url ?? 'unknown',
      method: request.method ?? 'unknown',
      counter,
    };

    response.statusCode = httpStatus.OK;
    response.setHeader('Content-Type', 'application/json');
    response.write(stringifyObject(dataObject));
    response.end();
  } catch (error) {
    handleError(error, response);
  }
}

export { handleRequest };
