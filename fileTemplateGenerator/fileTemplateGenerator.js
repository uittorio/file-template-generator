class FileTemplateGenerator {
  static generate(config) {
    config.files.forEach((file) => {
      new Generator(file, config.parameters).createFile();
    });
  }
}

module.exports = FileTemplateGenerator;