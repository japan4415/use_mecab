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
  return(url_list);
}

use_curl = function(url){
  result = null;
  result = curl(url,function(err){
    return(this.body)
    console.log(this);
    console.log('通ってるよ');
  });
  console.log('before return');
  return(result);
}

use_curl(url_list[0],function(data){
  console.log(data);
});

/*
async.each(road_url(filename),function(data,next){
  console.log(use_curl(data));
},function complete(err){
  console.log('all done!');
});
*/
