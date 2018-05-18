 # Test-Drive :: Angular 6 Workspace
![](assets/cool-cat-with-sunglasses.jpg)

The most recent version of Angular is a significant release. The default environment is now a workspace (well, maybe not - more later) that allows for the development of multiple applications and libraries in a single workspace. When you add new applications and/or libraries, you are creating ` project ` items. A project item has a specific type to indicate whether it is an ` application ` or a ` library `. 

        application: is a single-page web application.
        library: is a module that is shared by multiple applications

The workspace tooling for Angular development was introduced by NRWL.io's Nx toolset. A package with a set of extensions/schematics that allow you to create a ` workspace ` using custom configuration provided by NRWL. If you use Nx, you create ` apps ` that is either a ` lib ` or an ` app ` (Angular Single Page Web application). 

## Angular 6 Workspace Test Drive
I want to test-drive the new Angular project workspace and kick the tires a little. And, also compare it to NRWL.io's Nx workspace. The following are my expectations:

1. Use a @scope for libraries - to help manage and organize the libraries. For example, `@buildmotion/security` where my scope is `@buildmotion`
2. Use the scope name if there are any library candidates for publishing to NPM. 
3. Consumers (i.e., application components or other modules) of the library should be able to ` import ` the library using its scope and name: `@buildmotion/security`.
4. Easy configuration of library and application projects.

Angular 6 has a new ` angular.json ` configuration that replaces the old ` .angular-cli.json ` file. This new configuration contains a list of ` projects ` to allow for individual configuration of multiple projects. 

In order to be able to use these new features, you should:

1. Update your `global` development environment to use Angular 6.

```
npm install -g @angular/cli@latest
```

2. Create a new ` workspace ` for development.

```
ng new buildmotion
```

If you created the new workspace, you will note that there is a `src` folder in the root of the workspace with a default web application. This is the same for previsous version of the Angular CLI. 

The configuration of the default web application is contained in the `angular.json` projects section. If you use the CLI to create additional projects (library or application), the CLI will create a new folder in the ` projects ` folder for each new project. 

I would prefer to have all of my projects, including the default application, in the projects folder. Is the default application in the root's `src` folder different or more special? It is a little confusing to have applications in (2) different locations - I prefer consistency. It feels like that the new environment supports workspace, but the default project setup is still using the previous folder structure for a single web application. And by the way, if you want to add more projects to the `workspace` that is supported too. 

### New Configurations using angular.json

You can review the schema to see all of the available configuration settings allowed. You can view a more detailed description at [https://github.com/angular/angular-cli/wiki/angular-workspace](https://github.com/angular/angular-cli/wiki/angular-workspace).

```json
"$schema": "./node_modules/@angular/cli/lib/config/schema.json",
```

* $schema: references the specified ` schema.json ` file used by the cli.
* version (integer): File format version. This is currently "1".
* newProjectRoot (string): Path where new projects will be created.
* projects: A list of ` project ` items.
* defaultProject (string): Default project name used in commands.
* cli: Workspace configuration options for Angular CLI.
* schematics (object): Workspace configuration options for Schematics.
* projects: Configuration options for each project in the workspace.

## Application Project
When a new project of type ` application ` is created, the ` projects ` section in ` angular.json ` adds configuration for the following items.

* root: Root of the project files.
* sourceRoot: The root of the source files, assets and index.html file structure.
* projectType: An enum to specify the project type: ` application `, ` library `
* prefix: The prefix to apply to generated selectors.
* schematics:  Project configuration options for Schematics. Has the same format as top level Schematics configuration).
* architect: Project configuration for Architect targets.
    * build
    * serve
    * extract-i18n
    * test
    * lint

There are (2) project types that are allowed by the angular.json schema. The ` projectType ` and ` root ` properties are required for a projects item. The `enum` values are show below.

```json
"projectType": {
    "type": "string",
    "description": "Project type.",
    "enum": [
    "application",
    "library"
    ]
}
```

## Library Project
When a new project of type ` library ` is created, the ` projects ` section in ` angular.json ` adds configuration for the following items. Libraries are consumed and not served - therefore, there is no `serve` architect configuration.

* root: Root of the project files.
* sourceRoot: The root of the source files, assets and index.html file structure.
* projectType: An enum to specify the project type: ` application `, ` library `
* prefix: The prefix to apply to generated selectors.
* architect: Project configuration for Architect targets.
    * build
    * test
    * lint

```json
"libOne": {
      "root": "projects/buildmotion/lib-one",
      "sourceRoot": "projects/buildmotion/lib-one/src",
      "projectType": "library",
      "prefix": "lib",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-ng-packagr:build",
          "options": {
            "tsConfig": "projects/buildmotion/lib-one/tsconfig.lib.json",
            "project": "projects/buildmotion/lib-one/ng-package.json"
          },
          "configurations": {
            "production": {
              "project": "projects/buildmotion/lib-one/ng-package.prod.json"
            }
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "projects/buildmotion/lib-one/src/test.ts",
            "tsConfig": "projects/buildmotion/lib-one/tsconfig.spec.json",
            "karmaConfig": "projects/buildmotion/lib-one/karma.conf.js"
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "projects/buildmotion/lib-one/tsconfig.lib.json",
              "projects/buildmotion/lib-one/tsconfig.spec.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        }
      }
    }
```

## Create Workspace Items
I will use the CLI to generate additional web applications and new libraries in the workspace. We will use this application to consume our libraries.

### Web Application 
Create a new application (web) called `webOne`. A new project folder will be created for the application. 

```
ng generate application webOne
```

Build the application using the CLI command:

```
ng build --project=webOne
```

Run the application using the CLI command:

```
ng serve webOne
```


### Library
It is a good practice to scope your libraries that you are responsible for. In this example, I would like to have all of libraries scoped using ` @buildmotion `. This is a convenient way to organize your libraries. Scopes are a way of grouping related packages together. I'm not sure how practical this is for a development workflow where libraries are shared by applications, but not published or distributed to NPM (for use by other applications not contained in the workspace).

* [npm-scope](https://docs.npmjs.com/misc/scope) 
* [How to work with scoped packages.](https://docs.npmjs.com/getting-started/scoped-packages)
* [Publishing an Organization scoped package.](https://www.npmjs.com/docs/orgs/publishing-an-org-scoped-package.html)

Create a new library project with the @scope name along with the name of the library. This will actually create a folder called ` buildmotion ` in ` projects ` with a new library folder of ` lib-one `. 

Ex: ng generate library @SCOPE-NAME-HERE/LIBRARY-NAME-HERE
```
ng generate library @buildmotion/libOne
```

The name of the package is ` @buildmotion/lib-one ` - note, that it also contains the scope name of `@buildmotion`. The `name` value in the project root `package.json` of the library contains the correct value if you want to publish the package to NPM. 

```json
{
  "name": "@buildmotion/lib-one",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^6.0.0-rc.0 || ^6.0.0",
    "@angular/core": "^6.0.0-rc.0 || ^6.0.0"
  }
}
```

You will need to modify the name of the project in the angular.json file to remove the `@buildmotion/` scope. A name value of `@buildmotion/libOne` contains invalid characters as defined by the schema for the angular.json.

```json
 "libOne": {
      "root": "projects/buildmotion/lib-one",
      "sourceRoot": "projects/buildmotion/lib-one/src",
      "projectType": "library",
      "prefix": "lib",
      ...
    }
```

### Add a Service to the Library
Use the CLI to create a service in the new library. We want to be able to reference the library and service using the `@buildmotion/libOne`. 

```
ng generate service hello  --project=libOne
```

Interestingly, the schematic that generates a new library also creates a default service for each library. Are assuming that all libraries require a service to act as an API for module? 

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibOneService {

  constructor() { }
}
```

Additionally, the schematic generates a default component for the library as well. I would prefer to add services and components to my libraries as needed for the desired implementation and purpose of the library. Not all libraries will need/use services and components. But it is a good start. 

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-libOne',
  template: `
    <p>
      lib-one works!
    </p>
  `,
  styles: []
})
export class LibOneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

## Use the Library in the Application
Now that we have some components and services in our library we are ready to use them in the application. I can inject the service into the constructor. Visual Studio Code will create the import statement for the component. However, notice that we are not using the `@buildmotion/lib-one` scope and library name. This is disappointing. The NRWL.io Nx workspace does this by default. 

```typescript
import { LibOneService } from 'dist/@buildmotion/lib-one/public_api';
```

I would prefer to see:

```typescript
import { LibOneService } from '@buildmotion/lib-one';
```

However, we get a `path` reference to the `LibOneService`. Update the path value to use the scope name value: `@buildmotion/lib-one`. We'll provide a fix next to make this happen.

```typescript
import { Component, OnInit } from '@angular/core';
import { LibOneService } from '@buildmotion/lib-one';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(
    private oneService: LibOneService
  ) {

  }

  ngOnInit(): void {
    this.title = this.oneService.SayHello("Angular 6 Workspace");
  }
}
```

### Import Reference Fix
Update the workspace's root `tsconfig.json` file to include (2) new items for each of our libraries. Basically, we are telling the compilers where to look for the `module` when it imports `@buildmotion/lib-one` or `@buildmotion/lib-two`. 

```json
"paths": {
      "libOne": ["dist/libOne"],
      "libTwo": ["dist/libTwo"],
      "@buildmotion/lib-two":["dist/@buildmotion/lib-two"],
      "@buildmotion/lib-one":["dist/@buildmotion/lib-one"]
    }
```

Note that the folder is the `dist` folder. This means that if want the consuming applications to get the latest changes to any library project, you will need to build the libraries. I created a new `script` item in the workspace package.json file to do this.

```
 "package": "ng build --project=libTwo && ng build --project=libOne",
 ```

 Execute the script to build and output the libraries into the `dist` folder - ready for consumption. Although this is an extra step, it is much more efficient than going through the publishing process when they are separate projects. Set the order precendence based on the dependencies of the libraries. In our example, libOne depends on libTwo. Therefore, libTwo is compiled before libOne. Got it?

 ```
 npm run package
 ```

However, if you publish one or more of your custom libraries to NPM and one of them has a dependency on an existing library in the same scope (i.e., @buildmotion), it will need the dependency defined using import statements that use the correct scope and name of the package. This will be the case when you publish package groups using the same scope name.

```
ng generate library @buildmotion/libTwo
```

You can now build the new library in the workspace by indicating which library by name using the `--project` switch.

```
 ng build --project=libTwo
 ```

We'll modify the `SayHello` method in the `LibOneService` to use and call a method on the `LibTwoService`. 

```typescript
SayHello(message: string): string {
if(message) {
    this.libTwoService.SayHello(message);
}
return 'Next time send in a message.';
}
```

Implement the `SayHello` method on the service. This service is consumed by another library/module. This should be supported, right? 

 ```typescript
 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibTwoService {

  
  constructor() { }

  SayHello(message: any): any {
   return `Hello ${message}.`;
  }
}
```

Build the new libaries. You should see the output in the `dist` folder under the `@buildmotion` folder. 

```
npm run package
 ```


Attempt to build the `LibOne` library. You will see the following error message. I think it should be a core feature that a `library` should be able to reference and use another `package`. It is a basic and fundamental requirement for package/library development. What we have currently in the new Angular Workspace is the ability to add multiple applications and multiple libraries. As long as the dependency direction is from application to library we are all good. However, as soon as we have a library-to-library dependency (which really is package-to-package) this doesn't work. Hopefully, I'm not missing something here. I'll need to investigate further.

For example, if I have a basic logging library, it is reasonable to reuse the logging library in additonal custom libraries that I have in my workspace. 

I get a build error when a library references/uses another library in the project workspace. 
```
BUILD ERROR
Cannot read property 'module' of undefined
TypeError: Cannot read property 'module' of undefined
...
```

## Solution to Sharing Libraries with Other Libraries
I copied the output of the `dist` folder to `node_modules`. This allowed the import reference to use the @scope and name of the library `LibTwo. To be fair, the NRWL.io Nx workspace has the same issue when building libraries that contain dependencies on other libraries in the same workspace. By default, it is expecting the `package` references as `@buildmotion/security` to be in the `node_modules/@buildmotion/security` folder. I need to determine if there is an alternative with additional configuration to allow the libraries to find their dependencies without having to look in the node_modules folder (i.e., eliminate copying the build output). 

```typescript
import { Injectable } from '@angular/core';
import { LibTwoService } from '@buildmotion/lib-two';

@Injectable({
  providedIn: 'root'
})
export class LibOneService {

  
  constructor(
    // inject a service from a different module/library;
    private libTwoService: LibTwoService
  ) { }

  SayHello(message: string): string {
    if(message) {
      // USE A SERVICE FROM ANOTHER LIBRARY
      this.libTwoService.SayHello(message);
    }
    return 'Next time send in a message.';
  }
}
```

Now, we can build `libOne` because it now knows where `libTwo` is located (for now it can be found in the `node_modules/@buildmotion/lib-two` folder. One thing to note is that if your workspace contains libraries with dependencies on other workspace libraries, you will need to build these in the correct dependency sequence.

If there is no other work-around or configuration option, you will need to add a step in the build process to `copy` the output of each library build to the `node_modules` folder. I currently do not like having to do this. But for this quick demo it was the fastest alternative. 

```
ng build --project=libOne
```

The `ng-packagr` builds the library project without any errors. This is good news. 

![](assets/build-lib-one.png)

### Library Peer Dependencies
If you are going to publish your libraries created in the Angular 6 workspace, you will need to update the `peerDependencies` in the library's `package.json` file. This is what gets published to NPM. When consumers of your library install the package, the `peerDependencies` are listed for the developer to manually install. 

We should be able to consume the library that consumes another library from the `webOne` application.

```
ng serve --project=webOne
```

![](assets/hello-ng-6-workspace.png)

## Wrapping Up

1. The workspace environment does not appear to support @scope names and references from consumers of libraries.
2. The environment supports one-way dependencies from a consumer `application` to one or more `library` projects. 
3. The environment does not support `library-to-library` dependencies.
4. May not be a good choice for developing libraries that have a primary destination of a package manager repository (think NPM). 
5. The default `application` is created in the root `src` folder when a new workspace is created. 