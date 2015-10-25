var exec = require('child_process').exec,cmd;
var fs = require('fs');

cmd = 'mecab test -o test_result';

var words = [];
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
	var i = 0;
	fs.readFileSync('./test_result','utf8').toString().split('\n').forEach(function(line){
		words[i] = new in_words();
		i2 = 0;
		line.replace(/\t/,',').split(',').forEach(function(line){
			switch (i2){
				case 0:line = words[i].hyoso;
				case 1:line = words[i].hinshi;
				case 2:line = words[i].hinshi1;
				case 3:line = words[i].hinshi2;
				case 4:line = words[i].hinshi3;
				case 5:line = words[i].katuyokei;
				case 6:line = words[i].katuyogata
				case 7:line = words[i].genke;
				case 8:line = words[i].yomi;
				case 9:line = words[i].hatuon;
			}
			i2++;
		});
		i++;
	});
	console.log(words);
};

mecab();
check();
onebyone();
