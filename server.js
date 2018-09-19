/*console.log("Hello");

const name = process.argv[2];
console.log(`Hi ${name}!`);

function my() {
    let str = "";
    for (let i = 2; i < process.argv.length; i++) {
        str += process.argv[i] + " ";
    }
    return str;
}

console.log(my());*/

////////////5.1//////////////////////////
var fs = require("fs");
var testFolder = process.argv[2];
testFolder=testFolder.replace('\\','\\\\');
testFolder=testFolder.split('\\').join('\\\\');
fs.writeFileSync("summary.js", "\
var walk    = require('walk');\
var files   = [];\
var path = require('path');\
var walker  = walk.walk(\""+testFolder+"\", { followLinks: false });\
walker.on('file', function(root, stat, next) {\
    files.push(root.replace(\""+testFolder+"\",'') + '/' + stat.name);\
    next();\
});\
walker.on('end', function() {\
    console.log(files);\
});\
")


//////////////////////////////////////
