const ProcessService = require('./lib/process/process');
const processService = new ProcessService(process);

(function() {
  if (!processService.hasArgument('type')) {
    exitWithError('No type provided, Please provide one from your config');
  }

  if (!processService.hasArgument('name')) {
    exitWithError('No name provided, Please provide the name of the file');
  }

  const config = require('./template-generator.config');

  if (!config) {
    exitWithError('No config defined, Please create one');
  }

  // const typeArg = processService.getArgument('type');
  //
  // const typeToCreate = config.schemas.find((schema) => {
  //   return schema.type === typeArg;
  // });
  //
  // if (!typeToCreate) {
  //   exitWithError('The type provided is not present in the config file');
  // }
  //
  // const parameters = typeToCreate.parameters.map((parameter) => {
  //   if (!processService.hasArgument(parameter)) {
  //     exitWithError('the parameter ' + parameter + ' has not been provided. Please provide all the parameters defined in your schema')
  //   }
  //
  //   return processService.getArgument(parameter)
  // });
  //
  // typeToCreate.files.forEach((file) => {
  //   const type = new file.class(...parameters);
  //
  //   const fnNames = Object.getOwnPropertyNames(Object.getPrototypeOf(type)).filter((fn) => {
  //     return fn.indexOf('$') === 0;
  //   });
  //
  //   File.read(file.template, (content) => {
  //     if (!type.fileName) {
  //       exitWithError('the schema for ' + type.constructor.name + ' has not implemented the fileName method. Please define one')
  //     }
  //
  //     fnNames.forEach((fn) => {
  //       const nameToRemove = escapeRegExp(fn);
  //       const regExpToRemove = new RegExp('(' + nameToRemove + '\\b)', 'g');
  //
  //       content = content.replace(regExpToRemove, type[fn]());
  //     });
  //
  //     File.create(type.fileName(), content);
  //   });
  // });
})();

function exitWithError(message) {
  console.error(message);
  processService.exit();
}

function escapeRegExp(stringToGoIntoTheRegex) {
  return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
