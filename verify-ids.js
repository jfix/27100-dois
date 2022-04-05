const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

// const sl = fs.readFileSync('./statlinkids.txt').toString().replace(/\r\n/g, '\n').split('\n');

const inFileName = "DOI_Mismatch.csv";

const testObjectsInArray = (a, s) => {
    for (const wp of a) {
        if (wp.identifier === s) {
            wp.duplicate = 'true'
            return true;
        }
    }
    return false;
}

const regex = /^[^-]+$/;

const readParser = parse({columns: false}, function(err, line) {
    let res = [];
    const item = line[0]
    if (item.match(regex)) {
        res.push(line)
    }
    stringify(wps, {
        headers: true
    }, function(err, output) {
        fs.writeFile(__dirname + '/final.csv', output)
    })
    
});

fs.createReadStream(__dirname + '\\' + inFileName).pipe(readParser);

// const wp = fs.readFileSync('./workingpaperids.txt').toString().replace(/\r\n/g, '\n').split('\n');



// wp.forEach(wpid => {
//     if (sl.includes(wpid)) {
//         if (res.includes (wpid)) {
//             console.log(`${wpid} - duplicate`)
//         } else {
//             res.push(wpid);
//             fs.writeFileSync('out.csv', `https://doi.org/10.1787/${wpid}\n`, {
//                 flag: "a+"
//             })
//         }
//     }
// });
// console.log(res.length)