'use strict';

var redis = require('./redis'),
//client = redis.createClient();
client = redis.createClient(6379, '127.0.0.1', {'detect_buffers': true});
var bert = require('./bert');
var bert2 = require('./bert2');

var r;

client.on('error', function (err) {
    console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
});

// client.lrange('jonas', '0', '-1', function(err, result) {
//   console.log(result);
// });
// to get a buffer as result, include 'new Buffer(x)', insted of 'x'
client.hmget(new Buffer('snapshots'), 'jay', function(err, res) { 
  //var bytes = [];
  //var result   = JSON.stringify(res);
  //for (var i = 0; i < result.length; ++i) {
  //    bytes.push(result.charCodeAt(i));
  //}
  ////http://stackoverflow.com/questions/8533172/how-to-extract-an-object-in-node-js-which-object-is-decoded-using-bert-js
  //var output = '';
  //for (var property in res) {
  //  output += property + ': ' + res[property]+'; ';
  //}
  // var S = bert.bytes_to_string([131,104,2,107,0,5,72,101,108,108,111,108,0,0,0,2,104,3,97,1,107,0,4,106,111,104,110,107,0,7,106,111,104,110,49,50,51,104,3,97,2,107,0,7,77,105,99,104,97,108,101,107,0,10,109,105,99,104,97,108,101,49,50,51,106]);
  // var S2 = bert.bytes_to_string(serial);
  // var obj = bert.decode(S2);
  r = res;
  var json = r[0].toJSON()['data'];
  var S3 = bert.bytes_to_string(json);
  var obj2 = bert.decode(S3);  
  console.log(obj2);
  r = res;

  console.log(bert2.decode(json));
  // r[0][0] = 131  yeah!    r[0].toJSON()['data']
  //var s = bert.bytes_to_string(result);
  //var data = result.toString('binary');
  //var b = bert.decode(data);
  //console.log(typeof(output));
  //console.log(output);
  //console.log(bert.decode(output));

});

function unpack(str) {
    var bytes = [];
    for(var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8);
        bytes.push(char & 0xFF);
    }
    return bytes;
}

client.quit(function (err, res) {
    console.log('Exiting from quit command.');
});




var serial =
[ 131,
  104,
  10,
  100,
  0,
  13,
  99,
  111,
  117,
  110,
  116,
  101,
  114,
  95,
  115,
  116,
  97,
  116,
  101,
  100,
  0,
  3,
  106,
  97,
  121,
  100,
  0,
  9,
  117,
  110,
  100,
  101,
  102,
  105,
  110,
  101,
  100,
  100,
  0,
  9,
  117,
  110,
  100,
  101,
  102,
  105,
  110,
  101,
  100,
  106,
  104,
  2,
  104,
  3,
  98,
  0,
  0,
  7,
  224,
  97,
  3,
  97,
  9,
  104,
  3,
  97,
  13,
  97,
  59,
  97,
  26,
  104,
  2,
  104,
  3,
  98,
  0,
  0,
  7,
  224,
  97,
  3,
  97,
  9,
  104,
  3,
  97,
  13,
  97,
  59,
  97,
  49,
  104,
  2,
  104,
  3,
  98,
  0,
  0,
  7,
  224,
  97,
  3,
  97,
  9,
  104,
  3,
  97,
  14,
  97,
  0,
  97,
  46,
  97,
  35,
  100,
  0,
  4,
  116,
  114,
  117,
  101 ]

