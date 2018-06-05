const Generator = require('../lib/generator/generator');

class FileTemplateGenerator {
  static generate(config) {
    config.files.forEach((file) => {
      new Generator(file, config.path, config.parameters).createFile();
    });
  }
}

module.exports = FileTemplateGenerator;