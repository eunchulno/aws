var AWS = require('aws-sdk');
var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});
