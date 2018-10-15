var fs = require('fs')

fs.createReadStream('1.flv').pipe(fs.createWriteStream('1-pipe.mp4'))