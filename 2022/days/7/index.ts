// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from '../util/fileProcessing';

const file = 'days/7/input.txt';

interface CommandCd {
  type: 'command';
  content: string;
  operation: 'cd'
  target: string;
}

interface CommandLs {
  type: 'command';
  content: string;
  operation: 'ls'
}

interface OutputDir {
  type: 'output';
  content: string;
  objectType: 'dir';
  name: string;
}

interface OutputFile {
  type: 'output';
  content: string;
  objectType: 'file';
  name: string;
  size: number;
}

type CommandOrOutput = 
  | CommandCd
  | CommandLs
  | OutputDir
  | OutputFile;

const cdFactory = (line: string): CommandCd => {
  return {
    type: 'command',
    content: line,
    operation: 'cd',
    target: line.split("cd ")[1],
  }
};

const lsFactory = (line: string): CommandLs => {
  return {
    type: 'command',
    content: line,
    operation: 'ls',
  }
};

const dirFactory = (line: string): OutputDir => {
  return {
    type: 'output',
    content: line,
    name: line.split(' ')[1],
    objectType: 'dir',
  }
};

const fileFactory = (line: string): OutputFile => {
  const [size, name] = line.split(' ')
  return {
    type: 'output',
    content: line,
    name,
    objectType: 'file',
    size: Number(size),
  };
};

const generateInstructions = (line: string): CommandOrOutput => {
  if (line.includes("$ cd")) {
    return cdFactory(line);
  }

  if (line.includes("$ ls")) {
    return lsFactory(line);
  }

  if (line.includes('dir ')) {
    return dirFactory(line);
  }

  return fileFactory(line);
};

interface File {
  name: string;
  type: 'file';
  size: number;
}

interface Dir {
  name: string;
  type: 'dir';
  files: (Dir | File)[];
  parent: Dir | undefined;
}

const addFilesIfNotExisting = (currentDir: Dir, command: OutputDir | OutputFile): Dir => {
  if (currentDir.files.find(file => file.name === command.name)) {
    return currentDir;
  }
  if (command.objectType === 'dir') {
    currentDir.files.push({
      type: 'dir',
      files: [],
      name: command.name,
      parent: currentDir,
    });
    return currentDir;
  }

  currentDir.files.push({
    type: 'file',
    name: command.name,
    size: command.size,
  });
  return currentDir;
}

const runCommand = (currentDir: Dir | undefined, command: CommandOrOutput, root: Dir): Dir => {
  if (command.type === 'output') {
    return addFilesIfNotExisting(currentDir as Dir, command)
  }

  if (command.operation === 'ls') {
    return currentDir as Dir;
  }

  // cd is only option left
  if (command.target === '/') {
    return root;
  }

  if (command.target === '..') {
    return currentDir?.parent as Dir;
  }

  return currentDir?.files.find(files => files.name === command.target) as Dir;
}

type FileTree = Dir;

const generateTree = (entries: CommandOrOutput[]): FileTree => {
  const root: Dir = {
    name: '/',
    type: 'dir',
    files: [],
    parent: undefined,
  }

  let currentDir: Dir | undefined;

  for (const entry of entries) {
    currentDir = runCommand(currentDir, entry, root);
  }

  return root;
};

interface FolderSize {
  name: string;
  size: number;
}

const getSizesRecursive = (sizes: FolderSize[], tree: FileTree): {sizes: FolderSize[], totalSize: number} => {
  let totalSize = 0;

  for (const file of tree.files) {
    if (file.type === 'file') {
      totalSize += file.size;
    } else {
      const { sizes: folderSizes, totalSize: folderSize } = getSizesRecursive([], file);
      totalSize += folderSize;
      sizes.push(...folderSizes);
    }
  }

  sizes.push({
    name: tree.name,
    size: totalSize,
  });

  return { sizes , totalSize}

}

const printTree = (tree: File | Dir, prefix: string = "-") => {
  console.log(`${prefix} ${tree.name}`);
  if (tree.type === 'dir') {
    for (const file of tree.files) {
      printTree(file, `${prefix}-`);
    }
  }
}

const init = () => {
  const content = readFileSync(file).toString();
  const lines = splitLines(content);
  const entries: CommandOrOutput[] = generateEntries(lines, generateInstructions);
  const tree = generateTree(entries);
  const { sizes, totalSize: rootSize } = getSizesRecursive([], tree);
  
  const smallFolders = sizes.filter(size => size.size < 100000);

  let total = 0;
  for (const folder of smallFolders) {
    total += folder.size;
  }

  console.log("Anwser 1:", total);
  // console.log("Anwser 2:", partialOverlappingEntries.length);

  printTree(tree);
  // console.log(JSON.stringify(sizes, null, 4));
  

  const totalSpace = 70000000;
  const requiredUnused = 30000000;
  console.log(sizes);
  const free = totalSpace - rootSize;
  const requiredBeforeUpdate = requiredUnused - free;
  const largeEnoughFolders = sizes.filter(size => size.size > requiredBeforeUpdate);
  const sorted = largeEnoughFolders.sort((a, b) => a.size - b.size);
  // console.log(sorted);

  console.log({
    totalSpace,
    requiredUnused,
    rootSize,
    free,
    requiredBeforeUpdate
  })

  console.log("Anwser 2:", sorted[0].size);
  // 355 is too low
  // 20385515 is too high
};

init();
