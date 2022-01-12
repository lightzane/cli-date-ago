## Description

Your own customized CLI that depends on NodeJS which can run on CMD

## Getting Started

```
npm i
dateago --version
dateago 1/7/2022 1/10/2022 -hh -mm
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
6. Specify `version` and `"main"` in package.json: `dist/main.js`

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
SET dp0=%~dp0
node %dp0% %*
```

Running `dateago -v` will be intercept by `Commander` via `.parse()`
```
```

```cli
dateago -v
dateago --help
```

Notes:

| Syntax  | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| `%~dp0` | gets the local directory path of the .cmd file in which it was executed |
| `%1`    | gets the first argument in batchfile                                    |
| `%1`    | gets the second argument in batchfile                                   |
| `%*`    | gets all the argument                                                   |

## Commander

Typescript

```typescript
import { Command } from 'commander';
// argument must match with <filename>.cmd
const commander = new Command('dateago'); // dateago - will be show when calling --help flag
commander
    .version(require('./../package.json').version, '-v, --version', 'Output current version')
    .usage('<pastDate, futureDate?> [options]')
    .helpOption('-h, --help', 'Output usage information');

commander.parse(process.argv);
if (!process.argv.slice(2).length) commander.outputHelp(); // the user args will always start at index 2
```

Javascript

```javascript
const commander = require('commander');
commander
    .version(require('./../package.json').version, '-v, --version', 'Output current version')
    .usage('<pastDate, futureDate?> [options]')
    .helpOption('-h, --help', 'Output usage information');

commander.parse(process.argv);
if (!process.argv.slice(2).length) commander.outputHelp(); // the user args will always start at index 2
```

## Commander with additional options

```typescript
import { Command } from 'commander';
// argument must match with <filename>.cmd
const commander = new Command('dateago'); // dateago - will be show when calling --help flag
commander
    .version(require('./../package.json').version, '-v, --version', 'Output current version')
    .usage('<pastDate, futureDate?> [options]')
    .helpOption('-h, --help', 'Output usage information')

    .option('-d, --debug', 'Output extra debugging')
    .option('-hh, --hours', 'Display time as hour')
    .option('-mm, --minutes', 'Display time as minutes')
    .option('-p, --pizza-type <type>', 'Outputs a phrase about pizza', 'vegetarian');

commander.parse(process.argv);
if (!process.argv.slice(2).length) commander.outputHelp(); // the user args will always start at index 2

const options = commander.opts();
if (options.debug) console.log(options);
if (options.hh) {} // same with options.hours depending on how you declared it in .option()
if (options.pizzaType) console.log(`Your pizza type is: ${options.pizzaType}`);
```

## Global setup (Environment Variables)

If you want to call `dateago.cmd` **globally** (when you run CMD anywhere), add it to the `PATH`: `C:/path/to/cli-date-ago` in your environment variables. (without specifying the `<name>.cmd` file in the path)
