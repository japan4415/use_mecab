var usemecab = require('./usemecab.js');

var url1 = "http://kenko100.jp/articles/121019001761/";


/*
kekka = function(url){
  var ary = usemecab.chushutu(url);
  console.log(ary);
}
*/

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
