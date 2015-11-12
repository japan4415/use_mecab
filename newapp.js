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
  function(result,next){
    async.mapSeries(result,function(data,next2){
      curl(data,function(err){
        next2(null,this.body);
      });
    },function(err,results){
      next(null,results);
    });
  },
  function(result,next){
    async.map(result,function(data,next2){
      cmd = 'echo ' + result + '|mecab';
      exec(cmd,{timeout:1000},function(error,stdout,stderr){
        console.log('めかぶ:' + stdout);
        next2(null,stdout);
      });
    },function(err,results){
      next(null,results);
    });
  }/*,
  function(result,next){
    async.map(result,function(data,next2){
      var i = 0;
      var wards = [];
      data.toString().split('\n').forEach(function(line){
        line = line.replace(/\w+/,'');
        //console.log(line);
        words[i] = new in_words();
        i2 = 0;
        line.replace(/\t/,',').split(',').forEach(function(line){
          switch (i2){
            case 0:words[i].hyoso = line;
            case 1:words[i].hinshi = line;
            case 2:words[i].hinshi1 = line;
            case 3:words[i].hinshi2 = line;
            case 4:words[i].hinshi3 = line;
            case 5:words[i].katuyokei = line;
            case 6:words[i].katuyogata = line;
            case 7:words[i].genke = line;
            case 8:words[i].yomi = line;
            case 9:words[i].hatuon = line;
          }
          i2++;
        });
        i++;
      });
      next2(null,wards);
    },function(err,results){
      next(null,results);
    });
  },
  function(result,next){
    async.map(result,function(data,next2){
      var count = [];
      data.forEach(function(line){
        var check = 0;
        if(line.hinshi == "名詞" && line.hyoso != "" && line.hyoso.match(/^[^:/\\.=\[\]\(\)<>"!#;！?%{}'`+\$\*@&|-]/)){
          count.forEach(function(line2){
            if(line2.hyoso == line.hyoso){
              check = 1;
            }
          });
          if(check == 0){
            count.push(new in_count(line.hyoso));
          }
        }
      });
      next2('null',count);
    },function(err,results){
      next(null,results);
    });
  },
  function(result,next){
    async.map(result,function(data,next2){
      data.forEach(function(line){
        result.forEach(function(line2){
          if(line.hyoso == line2.hyoso){
            if(line2.hinshi == "名詞"){
              line.wcount++;
              //console.log(line.hyoso + "があったのでカウント");
            }
          }
        });
      });
      //console.log(words);
      //console.log(words[0].hinshi);
      next2('null',count);
    }
  },
  function(result,next){
    var j = 0;
    var goke = 0;
    result.forEach(function(line){
      goke = 0;
      line.forEach(function(line2){
        goke = line2.wcount;
      });
      line.forEach(function(line2){
        j = 0;
        count.forEach(function(line3){
          line3.forEach(function(line4){
            if(line2.hyoso == line4.hyoso){
              j++;
            }
          });
        });
        line2.all_count = j;
        line2.tfidf = line2.wcount / goke * Math.log(count.length / line2.all_count);
      });
    });
    next('null',result);
  }*/
],function(err,result){
  console.log(result);
});
