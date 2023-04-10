const { promises } = require('fs')
const fs = promises

const info = {
    contenidoStr: 'a',
    contenidoObj: 'a',
    size: 'a',

}

fs.readFile('./package.json', 'utf-8')

fs.appendFile()