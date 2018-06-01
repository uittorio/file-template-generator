const fs = require('fs');

function File() {}

File.create = function(file, content, callback) {
  fs.writeFile(file, content, function(err) {
    if (err) {
      return console.log(err);
    }

    if (callback) {
      callback();
    }
  });
};

File.read = function(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    if (callback) {
      callback(data);
    }
  });
};

module.exports = File;