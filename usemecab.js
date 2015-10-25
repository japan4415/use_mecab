var exec = require('child_process').exec,cmd;
var fs = require('fs');

cmd = 'mecab test -o test_result';

var words = [];
var in_words = [];

mecab = function(){
	return exec(cmd,{timeout:1000},
		function(error,stdout,stderr){
			//console.log('stdout:'+(stdout||'none'));
			//console.log('stderr:'+(stderr||'none'));
			if(error != null){
				//console.log('exec error:'+error);
			}
		}
	)
};

check = function(){
	fs.readFile('./test_result','utf8',function(err,text){
		//console.log(text);
		//console.log('error:'+(err||'none'));
	});
};

onebyone = function(){
	var i = 0
	fs.readFileSync('./test_result','utf8').toString().split('\n').forEach(function(line){
		words[i] = in_words[];
		var i2 = 0;
		line.replace(/\t/,',').split(',').forEach(function(line){
			words[i].in_words[i2] = line;
			i2++;
		});
	});
	console.log(words);
};

mecab();
check();
onebyone();
