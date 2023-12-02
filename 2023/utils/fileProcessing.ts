import fs from 'fs';

export const splitLines = (content: string): string[] => {
  return content.split('\n');
}

export const generateEntries = (lines: string[], factory: (line: string) => any): any[] => {
  const entries: any[] = [];
  for (const line of lines) {
    entries.push(factory(line));
  }
  return entries;
}

export const readFile = (path: string, next: Function) => {
  fs.readFile(path, 'utf8', function(err: unknown, data: string) {
    if (err) throw err;
    next(data);
  }); 
};
