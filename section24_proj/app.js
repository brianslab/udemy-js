#!/usr/bin/env node

import fs from 'fs';
import util from 'util';
import chalk from 'chalk';

const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map((filename) => {
        return lstat(filename);
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(chalk.green(filenames[index]));
        } else {
            console.log(chalk.blue(filenames[index]));
        }
    }
});
