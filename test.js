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

var result = null;

use_curl = function(url){
  async.series([
    function(next){
      curl(url,function(err){
        result = this.body;
        next();
      });
    },function complete(err,results){
      console.log('完了');
    }
  ]);
  return(result);
}

var url_list = road_url(filename);

use_curl(url_list[0]);

/*
async.each(road_url(filename),function(data,next){
  console.log(use_curl(data));
},function complete(err){
  console.log('all done!');
});
*/
