import * as aws from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';

dotenv.config({
    path: './.env'
})

const s3 = new aws.S3({
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
});

root();
async function root() {
    const objects = await s3.listObjects({
        Bucket: 'statuspage-statuspages3-1w57dzf8g31p5'
    }).promise();

    const finalObjects = objects.Contents.filter((object) => {
        return !object.Key.includes('metrics');
    });

    console.log(finalObjects);
    const promises = finalObjects.map(async (object)=>{
        const result = await s3.getObject({
            Bucket : 'statuspage-statuspages3-1w57dzf8g31p5',
            Key : object.Key
        }).promise();
        const data = result.$response.data;
        console.log(data);
    });
    await Promise.all(promises);
}   