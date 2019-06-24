import * as aws from 'aws-sdk';
import * as fs from 'fs-extra';
import { s3 } from './util';

root();
async function root() {
    const objects = await s3.listObjects({
        Bucket: process.env.bucket
    }).promise();

    const finalObjects = objects.Contents.filter((object) => {
        return !object.Key.includes('metrics');
    });

    const promises = finalObjects.map(async (object) => {
        const result = await s3.getObject({
            Bucket: process.env.bucket,
            Key: object.Key
        }).promise();
        const data: aws.S3.GetObjectOutput = result.$response.data as any;
        fs.ensureFileSync(`./aws-content/${object.Key}`);
        fs.writeFileSync(`./aws-content/${object.Key}`, data.Body.toString());

        fs.ensureFileSync(`./base-reference/${object.Key}`);
        fs.writeFileSync(`./base-reference/${object.Key}`, data.Body.toString());
    });
    await Promise.all(promises);

    if (fs.existsSync(`./aws-content/index-base.html`)) {
        fs.copyFileSync(`./aws-content/index-base.html`, `./aws-content/index.html`);
    }
}   