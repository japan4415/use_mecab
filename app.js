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

/*
  urlのリストのファイルから行毎に分解して配列で返す
  in:filename
  out:urlのlist
  要修正:readfileが非同期処理になっていない
*/
road_url = function(filename){
  var url_list = [];
  fs.readFileSync(filename,'utf8').toString().split('\n').forEach(function(line){
    url_list.add(line);
  });
  return(url_list);
}

use_curl = function(url){
  result = null;
  result = curl(url,function(err){
    return(curl)
  })
  return(result);
}

/*
  mecabを使って分解
  in:出力結果
  out:分解後
  要修正:execが非同期処理になっていない
*/
use_mecab = function(file){
  result = null;
  cmd = cmd_mecab + file;
  result = exec(cmd,{timeout:1000},function(error,stdout,stderr){
    return(stdout);
  });
  return(result);
}

/*
  mecabの結果を配列に格納する
  in:mecab結果平文
  out:mecab結果分割
*/
onebyone = function(after_mecab){
  var i = 0;
  var wards = [];
  after_mecab.toString().split('\n').forEach(function(line){
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
  //console.log(words);
  return(wards);
};

/*
  onebyoneの結果から記号を抜いて、名詞だけを取ってくる
  in:mecab結果分割
  out:mecab結果分割名詞only
  検討:mapを使っても良いんじゃないか or onebyoneに組み込み
*/
get_meishi = function(words){
  var count = [];
  words.forEach(function(line){
    var check = 0;
    if(line.hinshi == "名詞" && line.hyoso != "" && line.hyoso.match(/^[^:/\\.=\[\]\(\)<>"!#;！?%{}'`+\$\*@&|-]/)){
      count.forEach(function(line2){
        if(line2.hyoso == line.hyoso){
          check = 1;
        }
      });
      if(check == 0){
        count.push(new in_count(line.hyoso));
        //console.log("名詞だー" + line.hyoso + "を格納しよっと");
      }
    }
  });
  return(count);
}

/*
  mecab結果分割名詞を数え上げて、表層、回数の配列で返す
  in:mecab結果分割名詞
  out:表層、回数
*/
count_up = function(count){
  count.forEach(function(line){
    words.forEach(function(line2){
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
  return(count);
}

/*
  countの結果から比率を計算
  in:表層、回数
  out:表層、回数、比率
  検討:これ自体使わない？
*/
count_hiritu = function(count){
  var goke = 0;
  count.forEach(function(line){
    goke = goke + line.wcount;
  });
  count.forEach(function(line){
    line.hiritu = line.wcount / goke * 100;
  });
  return(count);
}

/*
  計算後、全体からカウントしてtf-idf法を適応
  in:表層、回数の配列の配列
  out:表層、回数、tf-idf値
*/
tfidf = function(count){
  var j = 0;
  var goke = 0;
  count.forEach(function(line){
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
  return(count);
}

/*
  urlから集計まで並列処理部分
  in:url
  out:urlでの表層、回数、比率？
  要修正:最後のreturnが効いていいない
*/
function score_culc(url_list){
  async.map(url_list,function(data,next){
    async.waterfall([
      function(data,next){
        use_curl(data,function(result){
          next(null,result);
        });
      },
      function(data,next){
        use_mecab(data,function(result){
          next(null,result);
        });
      },
      function(data,next){
        onebyone(data,function(result){
          next(null,result);
        });
      },
      function(data,next){
        get_meishi(data,function(result){
          next(null,result);
        });
      },
      function(data,next){
        count_up(data,function(result){
          next(null,result);
        });
      },
      function(data,next){
        count_hiritu(data,function(result){
          next(null,result);
        });
      }
    ],function complete(err,arg1){
      next(null,arg1);
    });
  },function(err,results){
    result_culc = results;
  });
}

/*
  メインの処理層、urllistを読み込んで、結果を吐く
  in:urllist
  out:計算結果配列
*/
function main(){
  async.waterfall([
    function(filename,next){
      road_url(filename,function(filename){
        next(null,filename);
      });
    },
    function(arg1,next){
      score_culc(arg1,function(){
        next(null,result_culc);
      });
    },
    function(arg1,next){
      tfidf(arg1,function(){
        next(null,result_culc);
      });
    }
  ],function complete(err,arg1){
    final_result = arg1;
  });
}

main(,function(){
  console.log(final_result);
});
