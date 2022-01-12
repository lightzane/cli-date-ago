// npm install commander.
// this is a utility to help you output version, help, etc
import { Command } from 'commander';
const commander = new Command();
commander
    .version(require('./../package.json').version, '-v, --version', 'Output current version')
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information');
commander.parse(process.argv);
// if (!process.argv.slice(2).length) commander.outputHelp();



// *************************************************************************
// ! Core Logic
// *************************************************************************
const pastDate = process.argv[2] || '1/1/1970';
const futureDate = process.argv[3];

const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 0
};

function dateAgo(pastDate: string, futureDate?: string): string {
    let future = futureDate || new Date();
    let ago = futureDate ? 'difference' : 'ago';
    const seconds = (+new Date(future) - +new Date(pastDate)) / 1000; // convert from milliseconds to seconds

    if (seconds < 29) return 'Just now';

    for (let i in intervals) {
        let counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
            if (counter === 1) return `${counter} ${i} ${ago}`;
            else return `${counter} ${i}s ${ago}`;
    }

    return '';
}

console.log(dateAgo(pastDate, futureDate));