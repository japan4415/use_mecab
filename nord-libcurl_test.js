var Curl = require('node-libcurl').Curl;

var curl = new Curl();

curl.setOpt('url','www.google.com');
curl.setOpt('FOLLOWLOCATION',true);

curl.on('end',function(statusCode,body,headers){
  console.info()
});
