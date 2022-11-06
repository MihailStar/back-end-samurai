interface DataObject {
  host: string;
  url: string;
  method: string;
  counter: number;
}

interface ErrorObject {
  reason: string;
}

function stringifyObject(object: DataObject | ErrorObject): string {
  return JSON.stringify(object, null, '  ');
}

export { DataObject, ErrorObject, stringifyObject };
