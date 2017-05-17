var AWS = require('aws-sdk');
//region 설정 - 서울
AWS.config.region = 'ap-northeast-2';

var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});

/*
 * ./aws/credentials 파일에 설정이 되어있어야한다. 양식은 다음과 같다

 [default]
 aws_access_key_id = your_access_key
 aws_secret_access_key = your_secret_key

 */