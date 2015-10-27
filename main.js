var usemecab = require('./usemecab.js');

var url1 = "http://kenko100.jp/articles/121019001761/";

kekka = function(url){
  var ary = usemecab.chushutu(url,function(ret){
    console.log("retだと" + ret);
  });
  console.log(ary);
}

kekka(url1);
