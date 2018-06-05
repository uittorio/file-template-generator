const Generator = require('../lib/generator/generator');
const ProcessService = require('../lib/process/process');
const processService = new ProcessService(process);

class FileTemplateGenerator {
  static generate(config) {
    config.files.forEach((file) => {
      new Generator(file, config.path || processService.getFolder(), config.parameters).createFile();
    });
  }
}

module.exports = FileTemplateGenerator;