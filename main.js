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

console.log(json1);
console.log(json2);
