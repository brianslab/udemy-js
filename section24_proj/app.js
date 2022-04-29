const fs = require('fs');

fs.readdir('.', (err, fileNames) => {
    if (err) {
        console.log(err);
    }

    console.log(fileNames);
});
