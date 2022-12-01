"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readModuleFile = void 0;
const fs = require('fs');
function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    }
    catch (e) {
        callback(e);
    }
}
exports.readModuleFile = readModuleFile;
