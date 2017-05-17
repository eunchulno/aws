/**
 * Created by T on 2017-05-17.
 */
var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred

    /*  file upload  */
    var param = {
        'Bucket':data.Buckets[0].Name,
        'Key':'meat.jpg',
        'ACL':'public-read',
        'Body':fs.createReadStream('meat.jpg'),
        'ContentType':'image/jpg'
    }
    s3.upload(param, function(err, data){
        if(err) console.log(err);
        else console.log(data);
    })
});

/* 응답 구조
{ ETag: '"********************************"',
    Location: 'https://*******************.com/meat.jpg',
    key: 'meat.jpg',
    Key: 'meat.jpg',
    Bucket: 'eunchul' }*/

/*
params (Object) (defaults to: {}) —
ACL — (String) The canned ACL to apply to the object. Possible values include:
    "private"
"public-read"
"public-read-write"
"authenticated-read"
"aws-exec-read"
"bucket-owner-read"
"bucket-owner-full-control"
Body — (Buffer, Typed Array, Blob, String, ReadableStream) Object data.
    Bucket — (String) Name of the bucket to which the PUT operation was initiated.
    CacheControl — (String) Specifies caching behavior along the request/reply chain.
    ContentDisposition — (String) Specifies presentational information for the object.
    ContentEncoding — (String) Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the Content-Type header field.
    ContentLanguage — (String) The language the content is in.
ContentLength — (Integer) Size of the body in bytes. This parameter is useful when the size of the body cannot be determined automatically.
    ContentMD5 — (String) The base64-encoded 128-bit MD5 digest of the part data.
    ContentType — (String) A standard MIME type describing the format of the object data.
    Expires — (Date) The date and time at which the object is no longer cacheable.
    GrantFullControl — (String) Gives the grantee READ, READ_ACP, and WRITE_ACP permissions on the object.
    GrantRead — (String) Allows grantee to read the object data and its metadata.
    GrantReadACP — (String) Allows grantee to read the object ACL.
    GrantWriteACP — (String) Allows grantee to write the ACL for the applicable object.
    Key — (String) Object key for which the PUT operation was initiated.
    Metadata — (map<String>) A map of metadata to store with the object in S3.
    ServerSideEncryption — (String) The Server-side encryption algorithm used when storing this object in S3 (e.g., AES256, aws:kms). Possible values include:
    "AES256"
"aws:kms"
StorageClass — (String) The type of storage to use for the object. Defaults to 'STANDARD'. Possible values include:
    "STANDARD"
"REDUCED_REDUNDANCY"
"STANDARD_IA"
WebsiteRedirectLocation — (String) If the bucket is configured as a website, redirects requests for this object to another object in the same bucket or to an external URL. Amazon S3 stores the value of this header in the object metadata.
    SSECustomerAlgorithm — (String) Specifies the algorithm to use to when encrypting the object (e.g., AES256).
    SSECustomerKey — (Buffer, Typed Array, Blob, String) Specifies the customer-provided encryption key for Amazon S3 to use in encrypting data. This value is used to store the object and then it is discarded; Amazon does not store the encryption key. The key must be appropriate for use with the algorithm specified in the x-amz-server-side​-encryption​-customer-algorithm header.
    SSECustomerKeyMD5 — (String) Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure the encryption key was transmitted without error.
    SSEKMSKeyId — (String) Specifies the AWS KMS key ID to use for object encryption. All GET and PUT requests for an object protected by AWS KMS will fail if not made via SSL or using SigV4. Documentation on configuring any of the officially supported AWS SDKs and CLI can be found at http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingAWSSDK.html#specify-signature-version
    RequestPayer — (String) Confirms that the requester knows that she or he will be charged for the request. Bucket owners need not specify this parameter in their requests. Documentation on downloading objects from requester pays buckets can be found at http://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectsinRequesterPaysBuckets.html Possible values include:
    "requester"
Tagging — (String) The tag-set for the object. The tag-set must be encoded as URL Query parameters*/

