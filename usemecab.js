var exec = require('child_process').exec,cmd;
var fs = require('fs');

cmd = 'mecab test -o test_result';

//wordsの下にin_wordsの内容が置いてある感じ
//words[n]で何番目の文字が指定が出来る
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

var count = [];
function in_count(hyoso){
	this.hyoso = hyoso;
	this.wcout = 0;
}

//mecabにtestを投げてtest_resultを受け取る
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

//結果を読み込んでそいつを単語単位にしてwordsにぶち込む
onebyone = function(){
	var i = 0;
	fs.readFileSync('./test_result','utf8').toString().split('\n').forEach(function(line){
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
};

get_meishi = function(words){
	words.forEach(function(line){
		if(line.hinshi == "名詞"){
			count.push(new in_count(words.hyoso));
			console.log("名詞だー" + words.hyoso + "を格納しよっと");
		}
	});
}

count_up = function(count){
	count.forEach(function(line){
		words.forEach(function(line2){
			if(line.hyoso == line2.hyoso){
				line.wcount++;
			}
		});
	});
	//console.log(words);
	//console.log(words[0].hinshi);
	console.log(count[1]);
}

mecab();
onebyone();
get_meishi(words);
count_up(count);
