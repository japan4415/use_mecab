var usemecab = require('./usemecab.js');

var url1 = "http://kenko100.jp/articles/121019001761/";

kekka = function(url){
  var ary = usemecab.chushutu(url);
}

kekka(url1);
//console.log("これから表示するよ\n" + usemecab.chushutu(url1));
