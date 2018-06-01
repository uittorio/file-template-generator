const ProcessService = require('./lib/process/process');
const processService = new ProcessService(process);
const Generator = require('./lib/generator/generator');

(function() {
  if (!processService.hasArgument('config')) {
    processService.exit('No config provided, Please create one')
  }

  if (!processService.hasArgument('type')) {
    processService.exit('No type provided, Please provide one from your config');
  }

  const config = require('./' + processService.getArgument('config'));
  const typeArg = processService.getArgument('type');

  const typeToCreate = config.schemas.find((schema) => {
    return schema.type === typeArg;
  });

  if (!typeToCreate) {
    processService.exit('The type provided is not present in the config file');
  }

  const parameters = typeToCreate.parameters.map((parameter) => {
    if (!processService.hasArgument(parameter)) {
      processService.exit('the parameter ' + parameter + ' has not been provided. Please provide all the parameters defined in your schema');
    }

    return processService.getArgument(parameter);
  });

  typeToCreate.files.forEach((file) => {
    new Generator(file, parameters).createFile();
  });
})();