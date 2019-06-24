import * as aws from 'aws-sdk';
import * as fs from 'fs-extra';
import { s3 } from './util';

root();
async function root() {
    const objects = await s3.listObjects({
        Bucket: 'statuspage-statuspages3-1w57dzf8g31p5'
    }).promise();

    const finalObjects = objects.Contents.filter((object) => {
        return !object.Key.includes('metrics');
    });

    const promises = finalObjects.map(async (object) => {
        const result = await s3.getObject({
            Bucket: 'statuspage-statuspages3-1w57dzf8g31p5',
            Key: object.Key
        }).promise();
        const data: aws.S3.GetObjectOutput = result.$response.data as any;
        fs.ensureFileSync(`./aws-content/${object.Key}`);
        fs.writeFileSync(`./aws-content/${object.Key}`, data.Body.toString());
    });
    await Promise.all(promises);
}   