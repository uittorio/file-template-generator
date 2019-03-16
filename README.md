# file-template-generator
Generate files with an open configuration.
The intention of this library is to give you the freedom to decide what you want to create and how many files create with different rules
It is not framework specific.

# How to use it

```
npm install file-template-generator -D -E

```
Import the library and use it in your node script 

```
const FileTemplateGenerator = require('file-template-generator');

```
## Overview

```ts
FileTemplateGenerator.generate({
    files: Array<{
        template: stringUrl, // the file schema
        class: require(stringUrl) // the class with the rules for the file
    }>;
    path: string, // where to save the files
    parameters: { // additional custom parameters to be used inside the files
        name: fileName,
        prefix: prefix
    }
});

```

**files**

```ts
FileTemplateGenerator.generate({
    files: Array<{
        template: stringUrl, // the file schema
        class: require(stringUrl) // the class with the rules for the file
    }>;
    ...
});
```

Let's talk about files.
File is the main concept of the library. 

It needs a template file and a class file.

Few rules:

- fileName in the class is required to defined the filename of the file
- Everything followed by the *$* symbol in the template file will be replace by his method in the class file.

    If we have for example *$Name* in the template you just need a method called *$Name* in the class and it will be replaced
    see example
    
- the constructor accept custom parameters. See below    

    ***template***
    ```ts
    export class $Name implements $IName {}

    ```

    ***class***
    ```js
    class MyClass {
        constructor(param) {
            this.name = param.name;
        }
    
        fileName() {
            return this.name + '.component.ts';
        }
    
        $Name() {
            return this.name + 'Component';
        }
    
        $IName() {
            return this.name + 'IComponent';
        }
    }

    module.exports = MyClass;
    ```

**path**

```js

FileTemplateGenerator.generate({
    path: string
    ...
});

```

This is where you save the file.

If you define a path of *test-folder* it will create the file inside test-folder and create the folder for you

**parameters**

```ts

FileTemplateGenerator.generate({
    parameters: { // additional custom parameters to be used inside the files
      name: fileName,
      prefix: prefix
    }
    ...
});

```

This parameter will be send to the constructor of each of your files so you can re used them to create your files

***class***
```js
class MyClass {
  constructor(param) {
    this.name = param.name; //name
    this.prefix = param.prefix; //prefix
  }

  ...
  $Name() {
    return this.prefix + this.name + 'Component';
  }
}

module.exports = MyClass;
```

**Libraries that are using file-template-generator**

- [angular-template-generator](https://www.npmjs.com/package/angular-template-generator)