#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, fileNames) => {
    if (err) {
        console.log(err);
    }

    // THE BAD WAY!
    for (let filename of fileNames) {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log(err);
            }

            console.log(filename, stats.isFile());
        });
    }
    // BAD CODE END
});
