var exec = require('child_process').exec,cmd;
var curl = require('node-curl');
var fs = require('fs');
var async = require('async');

var cmd_mecab = '';
var cmd_curl = 'curl -o test ';
var filename = './urllist';

var result = null;
var cmd = null;
var result_culc = null;
var final_result = null;

function in_words(){
  this.hyoso = null;
  this.hinshi = null;
  this.hinshi1 = null;
  this.hinshi2 = null;
  this.hinshi3 = null;
  this.katuyokei = null;
  this.katuyogata = null;
  this.genke = null;
  this.yomi = null;
  this.hatuon = null;
}

function in_count(hyoso){
  this.hyoso = hyoso;
  this.wcount = 0;
  this.hiritu = 0;
  this.all_count = 0;
  this.tfidf = 0;
}

function url_score(url){
  this.url = url;
  this.score = null;
}

async.waterfall([
  function(next){
    var url_list = [];
    fs.readFileSync(filename,'utf8').toString().split('\n').forEach(function(line){
      url_list.push(line);
    });
    next(null,url_list);
  },
  function(result,next2){
    async.mapSeries(result,function(data,next){
        curl(data,function(err){
          next2(null,this.body);
        });
    },function(err,results){
      next(null,results);
    });
  }
],function(err,result){
  console.log(result);
});
