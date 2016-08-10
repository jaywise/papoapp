var express = require('express');
var router = express.Router();

//start API calls to OpenEd partner server (http://docs.opened.apiary.io/#reference)
var request = require('request');

//algorithm that builds GET url based values from interface

var modality = "";
var visualPercentage = 45;
var linguisticPercentage = 0;
var logicalPercentage = 0;
var endpoint = "https://private-anon-f6bd48dfe0-opened.apiary-proxy.com/1/resources.json/?&limit=5&embeddable=true";

if (visualPercentage >= 33) {
    endpoint += "&resource_type=video";
    modality = "Visual";
};
if (linguisticPercentage >= 33) {
    endpoint += "&resource_type=audio";
    modality = "Linguistic";
};
if (logicalPercentage >= 33) {
    endpoint += "&resource_type=homework";
    modality = "Logical";
};



// ---GETS TOKEN ---
// request({
//   method: 'POST',
//   url: 'https://partner.opened.com/1/oauth/get_token',
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//   },
//   body: "{  \"client_id\": \"ddf17d90372621bd68210dd3428dcd8e260719a5882a50900a864828e56d9501\",  \"secret\": \"58f50cd0d4491a194576a28df70d6c29cac6b352df68537afa45bd3943eb2e7f\",  \"username\": \"jweiss\"}"
// }, function (error, response, body) {
//   console.log('Status:', response.statusCode);
//   console.log('Headers:', JSON.stringify(response.headers));
//   console.log('Response:', body);
// });


request({
    method: 'GET',
    url: endpoint, 
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer a61994173a124e50f3558fc8480896e3ca12f7fe2a5f7e44de14c93d2203db31'
    }
}, function(error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', JSON.parse(body));

    console.log("body object 1:", JSON.parse(body).resources[0].student_url);

    var iframeData = [];

    JSON.parse(body).resources.map(function(item) {
        iframeData.push(item.student_url)
    });

    console.log("iframeData array:", iframeData);

    router.get('/', function(req, res, next) {
        res.render('index', {
            title: 'Sua Sala',
            modality: modality,
            iframeSet1: iframeData[0],
            iframeSet2: iframeData[1],
            iframeSet3: iframeData[2],
            iframeSet4: iframeData[3]
        });
    });
});


module.exports = router;
