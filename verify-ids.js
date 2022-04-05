const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

const inFileName = "DOI_Mismatch.csv"
const regexId = /([0-9]{12})\.xml/

const extractInfo = (arr) => {
    const id = regexId.exec(arr[0])
    if (!id || id.length < 2) return
    const url = arr[1]
    return [`10.1787/${id[1]}`, url]
}
const regexLine = /^[^-]+\.xml$/
const readParser = parse({columns: false}, function(err, lines) {
    let res = [];
    for (const line of lines) {
        const fileName = line[0]
        if (fileName.match(regexLine)) {
            const record = extractInfo(line)
            if (record) res.push(record)
        }
    }
    fs.writeFileSync(__dirname + '/test.json', JSON.stringify(res))
    stringify(res, function(err, output) {
        if (err) {
            console.log(err)
            return
        }
        fs.writeFileSync(__dirname + '/final.csv', output)
        }
    );
});
fs.createReadStream(__dirname + '/' + inFileName).pipe(readParser);
