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

////////////5.2//////////////////////////
var mkdirp = require('mkdirp');
var walk    = require('walk');
var path = require('path');
var fs = require("fs");
var new_dir;

var testFolder = process.argv[2];
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



doTask();

function doTask(){
	  new_dir = `${process.argv[2]}/${path.basename(process.argv[2])}`;
	  console.log(new_dir);
}

function create_folder() {
    fs.exists(new_dir, function (exists) {
        if (!exists) {
            fs.mkdir(new_dir, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

function copy_files(generate_dir){
    fs.readdir(dir_path, function (err, items) {
        if(err){
            console.log(err);
        }else{
            for(let i = 0; i<items.length; i++){
                let file_name = items[i].toString();
                if(/.*\.txt/.test(file_name)){
                    create_file(file_name);
                }
            }
        }
    })
}

function create_file(file_path){
    fs.readFile(dir_path+'/'+file_path, 'utf8', (err, data)=> {
        if(err){
            console.log(err);
        }else{
            add_text(file_path, copyright+data+copyright);
        }
    });
}

function add_text(file_path, text){
    fs.appendFile(new_dir+'/'+file_path, text, 'utf8', (err)=> {
        if(err) {
            console.log(err);
        }
    });
}

function watchChanges() {
    fs.watch(new_dir, (eventType, filename) => {
        console.log(`event type is: ${eventType}`);
        if (filename) {
            console.log(`filename provided: ${filename.toString()}`);
        } else {
            console.log('filename not provided');
        }
    });
}



