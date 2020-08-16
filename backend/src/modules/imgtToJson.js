const request = require('request')
var fs = require('fs');

const axios = require('axios').default;

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

var _img = base64_encode('ocrsample.jpg');
const KEY = "aVVlTklDalJoTHlhckluaHR0bmRKVWxqdUZwU1VoR2o="
// console.log(_img)
const _header = {
    "Content-Type": "application/json",
    "X-OCR-SECRET": "RG9sRmpSR3B0bEZWYkViSEJ2ZWJoeURJUUh5QmtCQ0o="
}


const URL = "https://14bc9b9925f54cf79d4cc8680bef2c65.apigw.ntruss.com/custom/v1/3395/612a80e4eafb83d0d5b17e305393f46db53d24b41708bf710e6853a85373342b/infer"


function imgtojson() {

    let data =request.post({
        uri: URL,
        headers: _header,
        timestamp: new Date().toDateString(),
        body: {
            "images": [{
                "format": "jpg",
                "name": "medium",
                "data": _img,
                // "url": "https://www.gov.kr/2019/lib/image/page/img_idcard01.jpg"
            }],
            "lang": "ko",
            "requestId": "string",
            "resultType": "string",
            "timestamp": new Date().getDate(),
            "version": "V1"
        },
        json: true
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            return response.body.images
        }
    });
}