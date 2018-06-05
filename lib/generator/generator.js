const ProcessService = require('../process/process');
const processService = new ProcessService(process);
const File = require('../file/file');
const Dir = require('../dir/dir');
const nodePath = require('path');

class Generator {
  constructor(file, path, parameters) {
    this.file = file;
    this.path = path;
    this.type = new file.class(parameters);
    this.fnNames = this.getFnNamesFromClass(this.type);
  }

  createFile() {
    File.read(this.file.template, (content) => {
      const className = this.type.constructor.name;

      if (!this.type.fileName) {
        processService.exit('the schema for ' + className + ' has not implemented the fileName method. Please define one');
      }

      let filePath = nodePath.resolve(this.path, this.type.fileName());

      this.fnNames.forEach((fn) => {
        const nameToRemove = this.escapeRegExp(fn);
        const regExpToRemove = new RegExp('(' + nameToRemove + '\\b)', 'g');

        content = content.replace(regExpToRemove, this.type[fn]());
      });

      Dir.create(this.path);

      if (!File.exists(filePath)) {
        File.create(filePath, content);
      }
    });
  }

  escapeRegExp(stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  getFnNamesFromClass(classInstance) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance)).filter((fn) => {
      return fn.indexOf('$') === 0;
    });
  }
}

module.exports = Generator;