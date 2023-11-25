const fs = require('fs')


function readFilein(arg) {
    fs.readFile(`./assets/${arg}.txt`, (err, data) => {
        if (err) throw err;
        console.log(data.toString());
    })
}

readFilein('react')


const fs = require('fs')


function readFilein(arg) {

    //保证异步能够执行
    return new Promise((resolve, reject) => {
        fs.readFile(`./assets/${arg}.txt`, (err, data) => {
            if (err) throw err;
            //返回结果
            resolve(data.toString());
        })
    })
}

let reacttxt = readFilein('react')