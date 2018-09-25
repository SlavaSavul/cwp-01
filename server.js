/*console.log("Hello");

const name = process.argv[2];
console.log(`Hi ${name}!`);

function write() {
    let str = "";
    for (let i = 2; i < process.argv.length; i++) {
        str += process.argv[i] + " ";
    }
    return str;
}

console.log(write());
*/

////////////5.2//////////////////////////


var path = require('path');
var fs = require("fs");
var newDir;
var copyright;
var dirPath=process.argv[2];
var folder = process.argv[2];




fs.writeFileSync("summary.js", "\
var walk    = require('walk');\
var files   = [];\
var path = require('path');\
var walker  = walk.walk(\""+folder+"\", { followLinks: false });\
walker.on('file', function(root, stat, next) {\
    files.push(root.replace(\""+folder+"\",'') + '/' + stat.name);\
    next();\
});\
walker.on('end', function() {\
    console.log(files);\
});\
")



Go();

function Go(){
	  newDir = `${process.argv[2]}/${path.basename(process.argv[2])}`;
	 //console.log(newDir);
	  fs.readFile("config.json", "utf8", readCopyright);
	  copy(createFolder());
      watch();
}

function readCopyright(error,data){ 
    copyright=JSON.parse(data).copyright;
}


function createFolder() {
    fs.exists(newDir, function (exists) {
        if (!exists) {
            fs.mkdir(newDir, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

function copy(){
    fs.readdir(dirPath, function (err, items) {
        if(err){
            console.log(err);
        }
        else{
            for(let i = 0; i<items.length; i++){
                let fileName = items[i].toString();
                if(/.*\.txt/.test(fileName)){
                    createNewFile(fileName);
                }
            }
        }
    })
}

function createNewFile(filePath){
    fs.readFile(dirPath+'/'+filePath, 'utf8', (err, data)=> {
        if(err){
            console.log(err);
        }
        else{
            fs.appendFile(newDir+'/'+filePath, copyright+data+copyright, 'utf8', (err)=> {
                if(err) {
                  console.log(err);
                 }
            }); 
        }
    });
}

//////////////////////////////////////////

function watch() {
    fs.watch(newDir, (eventType, filename) => {
        console.log(`Event: ${eventType}`);
        if (filename) {
            console.log(`Filename: ${filename.toString()}`);
        } 
    });
}



