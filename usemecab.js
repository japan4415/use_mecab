var exec = require('child_process').exec,cmd;
var fs = require('fs');

cmd = 'mecab test -o test_result';

hoge = function(){
	return exec(cmd,{timeout:1000},
		function(error,stdout,stderr){
			console.log('stdout:'+(stdout||'none'));
			console.log('stderr:'+(stderr||'none'));
			if(error != null){
				console.log('exec error:'+error);
			}
		}
	)
};

check = function(){
	fs.readFile('./test_result','utf8',function(err,text){
		console.log(text);
		console.log('error:'+(err||'none'));
	});
};

hoge();
check();
