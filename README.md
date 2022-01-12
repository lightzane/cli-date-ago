## Description

Your own customized CLI that depends on NodeJS which can run on CMD

## Getting Started

```
npm i
dateago --version
```

### Create your own CLI

This was created using typescript and depends on nodejs.

#### Prerequisite

This assumes you have knowledge on the following:

-   Node Js
-   Typescript
-   Cmd / Batch files commands

1. Complete your core logic in your `src/*.ts` files
2. Declare a _build_ in package.json to produce dist `.js` file
3. Create your `<name>.cmd` file in root directory
4. `npm install commander` for handling options like version, help, etc
5. Import commander codes in your core logic (see [Commander](#commander))
6. Specify version and `"main"` in package.json: `dist/main.js`

Done!

## About

This app is **dateago** where node reads 0-2 arguments from `process.argv`. <br>

```
node dist/main
node dist/main 1/10/2022
node dist/main 1/10/2022 1/15/2022
```

Thus, also applying the same for the `dateago.cmd`

```batch
@ECHO off

SET past=%1
SET future=%2
SET dp0=%~dp0

IF "%future%" == "" (
    node %dp0% %past%
) ELSE (
    node %dp0% %past% %future%
)
```

Running `dateago -v` will be intercept by `Commander` via `.parse()`

## Commander

Typescript

```typescript
import { Command } from 'commander';
const commander = new Command();
commander.version(require('./../package.json').version, '-v, --version', 'Output current version').usage('<command> [options]').helpOption('-h, --help', 'Output usage information');
commander.parse(process.argv);
// if (!process.argv.slice(2).length) commander.outputHelp();
```

Javascript

```javascript
const commander = require('commander');
commander.version(require('./../package.json').version, '-v, --version', 'Output current version').usage('<command> [options]').helpOption('-h, --help', 'Output usage information');
commander.parse(process.argv);
// if (!process.argv.slice(2).length) commander.outputHelp();
```

## Global setup (Environment Variables)

If you want to call `dateago.cmd` **globally** (when you run CMD anywhere), add it to the `PATH`: `C:/path/to/cli-date-ago` in your environment variables. (without specifying the `<name>.cmd` file in the path)