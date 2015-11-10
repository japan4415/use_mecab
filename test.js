var exec = require('child_process').exec,cmd;
var curl = require('node-curl');
var fs = require('fs');
var async = require('async');

var filename = './urllist';

road_url = function(filename){
  var url_list = [];

  fs.readFileSync(filename,'utf8').toString().split('\n').forEach(function(line){
    url_list.push(line);
  });
  console.log(url_list);
  return(url_list);
}

road_url(filename);
console.log(road_url(filename));
