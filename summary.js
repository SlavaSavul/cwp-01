var walk    = require('walk');var files   = [];var path = require('path');var walker  = walk.walk("E:\\\\CWP\\cwp-01", { followLinks: false });walker.on('file', function(root, stat, next) {    files.push(root.replace("E:\\\\CWP\\cwp-01",'') + '/' + stat.name);    next();});walker.on('end', function() {    console.log(files);});