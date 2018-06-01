const ProcessService = require('../process/process');
const processService = new ProcessService(process);
const File = require('../file/file');

class Generator {
  constructor(file, parameters) {
    this.file = file;
    this.type = new file.class(...parameters);
    this.fnNames = this.getFnNamesFromClass(this.type);
  }

  createFile() {
    File.read(this.file.template, (content) => {
      const className = this.type.constructor.name;

      if (!this.type.fileName) {
        processService.exit('the schema for ' + className + ' has not implemented the fileName method. Please define one');
      }

      this.fnNames.forEach((fn) => {
        const nameToRemove = this.escapeRegExp(fn);
        const regExpToRemove = new RegExp('(' + nameToRemove + '\\b)', 'g');

        content = content.replace(regExpToRemove, this.type[fn]());
      });

      console.log(this.type.fileName());
      File.create(this.type.fileName(), content);
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