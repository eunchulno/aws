/**
 * Created by T on 2017-05-17.
 */
var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred

    /*  file get  */
    var params = {
        Bucket: data.Buckets[0].Name, /* required */
        Key: 'meat.jpg' /* required */
/*        IfMatch: 'STRING_VALUE',
        IfModifiedSince: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
        IfNoneMatch: 'STRING_VALUE',
        IfUnmodifiedSince: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
        PartNumber: 0,
        Range: 'STRING_VALUE',
        RequestPayer: requester,
        ResponseCacheControl: 'STRING_VALUE',
        ResponseContentDisposition: 'STRING_VALUE',
        ResponseContentEncoding: 'STRING_VALUE',
        ResponseContentLanguage: 'STRING_VALUE',
        ResponseContentType: 'STRING_VALUE',
        ResponseExpires: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
        SSECustomerAlgorithm: 'STRING_VALUE',
        SSECustomerKey: new Buffer('...') || 'STRING_VALUE',
        SSECustomerKeyMD5: 'STRING_VALUE',
        VersionId: 'STRING_VALUE'*/
    };

    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
});

/*
응답 예시
{ AcceptRanges: 'bytes',
    LastModified: 2017-05-17T04:55:13.000Z,
    ContentLength: 272335,
    ETag: '"7ba7769cc37cbaf6d404543e7636a847"',
    ContentType: 'image/jpg',
    Metadata: {},
    Body: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e1 6d 1c 45 78 69 66 00 00 49 49 2a 00 08 00 00 00 0b 00 0f 01 02 00 06 00 00 00 92 00 ... > }*/
