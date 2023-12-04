import fs from 'fs';

export const splitLines = (content: string): string[] => {
  return content.split('\n');
}

export const generateEntries = (lines: string[], factory: (line: string, index: number) => any): any[] => {
  const entries: any[] = [];
  let index = 0;
  for (const line of lines) {
    entries.push(factory(line, index));
    index++;
  }
  return entries;
}

export const flatMapEntries = (nestedEntries: any[][]): any[] => {
  const flatEntries = [];
  for (const entries of nestedEntries) {
    flatEntries.push(...entries);
  }
  return flatEntries;
}

export const readFile = (path: string, next: Function) => {
  fs.readFile(path, 'utf8', function(err: unknown, data: string) {
    if (err) throw err;
    next(data);
  }); 
};
