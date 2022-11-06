import { EOL } from 'os';

function print(...strings: string[]): void {
  if (strings.length === 0) {
    process.stdout.write(EOL);
    return;
  }

  strings.forEach((string) => {
    process.stdout.write(string);
    process.stdout.write(EOL);
  });
}

export { print };
