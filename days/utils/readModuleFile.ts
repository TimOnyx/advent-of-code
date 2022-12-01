const fs = require('fs');

type Callback = (error?: unknown, result?: string) => void;
export function readModuleFile(path: string, callback: Callback) {
  
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}
