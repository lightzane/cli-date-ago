// npm install commander.
// this is a utility to help you output version, help, etc
import { Command } from 'commander';
const commander = new Command('dateago'); // dateago - will be show when calling --help flag

commander
    .version(require('./../package.json').version, '-v, --version', 'Output current version')
    .usage('<pastDate, futureDate?> [options]')
    .helpOption('-h, --help', 'Output usage information')

    .option('-a, --author', 'outputs the author of this code')
    .option('-d, --debug', 'Output extra debugging')
    .option('-dd, --days, --day', 'Display time as days')
    .option('-hh, --hours, --hour', 'Display time as hours')
    .option('-mm, --minutes, --minute', 'Display time as minutes');
// .option('-p, --pizza-type <type>', 'Outputs a phrase about pizza', 'vegetarian'); // vegetarian = default value

commander.parse(process.argv);
if (!process.argv.slice(2).length) commander.outputHelp(); // the user args will always start at index 2

const options = commander.opts();
if (options.debug) console.log(options);
if (options.author) console.log(require('./../package.json').author);
// if (options.pizzaType) console.log(`Your pizza type is: ${options.pizzaType}`);

// *************************************************************************
// ! Core Logic
// *************************************************************************
const pastDate = process.argv[2]; // || '1/1/1970'; // default
let futureDate = process.argv[3]; // this argv[3] can either be a date or a flag

// ensures that the argument is not a flag
// or an option from the commander
if (futureDate?.includes('-', 0)) futureDate = new Date().toISOString();

const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 0
};

let timeDiff: number;
let ago: string;

function dateAgo(pastDate: string, futureDate?: string): string {
    let future = futureDate || new Date();

    try { new Date(future); } catch (err) { future = new Date(); }

    ago = futureDate ? 'difference' : 'ago';
    const seconds = (+new Date(future) - +new Date(pastDate)) / 1000; // convert from milliseconds to seconds
    timeDiff = seconds; // will be used outside of this method when needed by commander.options.hours etc

    if (seconds < 29) return 'Just now';

    for (let i in intervals) {
        let counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
            if (counter === 1) return `${counter} ${i} ${ago}`;
            else return `${counter} ${i}s ${ago}`;
    }

    return ''; // 'No input date detected...';
}

console.log(dateAgo(pastDate, futureDate));

if (options.days) console.log(Math.floor(timeDiff / 60 / 60 / 24) + ' days ' + ago);
if (options.hours) console.log(Math.floor(timeDiff / 60 / 60) + ' hours ' + ago);
if (options.minutes) console.log(Math.floor(timeDiff / 60) + ' minutes ' + ago);

