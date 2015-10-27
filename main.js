/*
非同期処理に悩まされたので取り敢えず分割。
こっちはサスペンドで。

var usemecab = require('./usemecab.js');

var url1 = "http://kenko100.jp/articles/121019001761/";



kekka = function(url){
  var ary = usemecab.chushutu(url);
  console.log(ary);
}


async.waterfall([
  function A(done){
    var ary = usemecab.chushutu(url1);
  },
  function B(done){
    console.log(ary);
  }
],function(err){
  console.log('all comp');
});

*/


/*
こっからは
usemecab1.js
usemecab2.js
を終わらせた後に使う関係性算出プログラムです。
*/

var json1 = require('./1st.json');
var json2 = require('./2st.json');

var kikyaku = 1;

function keisan(hyosoi,hiritui){
  this.hyoso = hyosoi;
  this.hiritu = hiritui;
}

var json1_kikyaku = [];
var json2_kikyaku = [];
var ketugo = [];

json1.forEach(function(line){
  if(line.hiritu >= kikyaku){
    json1_kikyaku.push(new keisan(line.hyoso,line.hiritu));
  }
});

json2.forEach(function(line){
  if(line.hiritu >= kikyaku){
    json2_kikyaku.push(new keisan(line.hyoso,line.hiritu));
  }
});

console.log(json1_kikyaku);
console.log(json2_kikyaku);


json1_kikyaku.forEach(function(line){
  json2_kikyaku.forEach(function(line2){
    if(line.hyoso == line2.hyoso){
      if(line.hiritu > line2.hiritu){
        var kyotu = line.hiritu - (line.hiritu - line2.hiritu);
      }
      else if(line.hiritu == line2.hiritu){
        var kyotu = 0;
      }
      else if(line.hiritu < line2.hiritu){
        var kyotu = line2.hiritu - (line2.hiritu - line.hiritu);
      }
      ketugo.push(new keisan(line.hyoso,kyotu));
      console.log("keisanに投入！！！");
    }
  });
});


console.log(ketugo);


var goke = 0;
ketugo.forEach(function(line){
  goke = goke + line.hiritu;
});
console.log("関係指数は　" + goke + "　です。");
