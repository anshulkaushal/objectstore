var CryptoJS = require("crypto-js");
var parseString = require('xml2js').parseString;
var key = "MRAZh5+HMYRJBOPwiGSf2sVwRs2obdgWwdGkY7dW3Net8FWmqaECtsT3wHSSqlNzDNgEQCAl5uMXsaZJYqaYBg==";
var strTime = (new Date()).toUTCString();
//var strToSign = 'GET\n\n\n\n\n\n\n\n\n\n\n\nx-ms-date:' + strTime + '\nx-ms-version:2018-03-28\n/bsmph2stapoc/\ncomp:list';
var strToSign = 'GET\n\n\n\n\n\n\n\n\n\n\n\nx-ms-date:' + strTime + '\nx-ms-version:2018-03-28\n/bsmph2stapoc/beachy\ncomp:list\nrestype:container';

var secret = CryptoJS.enc.Base64.parse(key);
var hash = CryptoJS.HmacSHA256(strToSign, secret);
var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
var auth = "SharedKey bsmph2stapoc:"+hashInBase64; 

const fetch = require("node-fetch");
//const fetch = require("fetch-with-proxy");
//import fetch from 'fetch-with-proxy';

console.log(strToSign);
console.log(auth);
console.log(strTime);





console.log((new Date()).toUTCString());
var request = require('request');

request({
    uri: 'https://bsmph2stapoc.blob.core.windows.net/beachy?restype=container&comp=list',
    proxy: 'http://CUSTOMSTW%5Cak005c:Captiva123@wlgproxy.customs.govt.nz:80/',
    headers: {
        'Authorization': auth,
        'x-ms-date': strTime,
        'x-ms-version': "2018-03-28"
     },
     rejectUnauthorized: false,
      requestCert: true,
      agent: false,
     method: 'GET'
}, function (error, response, body) {
    if (error) {
        console.log(error);
    } else {
        console.log(response.body);
        console.log((new Date()).toUTCString());
        parseString(response.body, function (err, result) {
            console.dir(result);
        });
    }
});
