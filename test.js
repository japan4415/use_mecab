var exec = require('child_process').exec,cmd;
var curl = require('node-curl');
var fs = require('fs');
var async = require('async');

var filename = './urllist';

road_url = function(filename){
  var url_list = [];

  fs.readFileSync(filename,'utf8').toString().split('\n').forEach(function(line){
    url_list.add(line);
  });
  return(url_list);
  console.log("return後");
}

road_url(filename);
console.log(road_url(filename));
