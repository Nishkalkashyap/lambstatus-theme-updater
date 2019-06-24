import { s3 } from './util';
import * as fs from 'fs-extra';

let baseRefHtml: string;
if (fs.existsSync(`./base-reference/index-base.html`)) {
    baseRefHtml = fs.readFileSync(`./base-reference/index-base.html`).toString();
} else {
    baseRefHtml = fs.readFileSync(`./base-reference/index.html`).toString();
}

const promises = [
    s3.upload({
        Bucket: process.env.bucket,
        Body: baseRefHtml,
        Key: 'index-base.html',
        ContentType: 'text/html'
    }).promise(),
    s3.upload({
        Bucket: process.env.bucket,
        Body: fs.readFileSync('./aws-content/index.html').toString(),
        Key: 'index.html',
        ContentType: 'text/html'
    }).promise(),
    s3.upload({
        Bucket: process.env.bucket,
        Body: fs.readFileSync('./aws-content/custom.css').toString(),
        Key: 'custom.css',
        ContentType: 'text/css'
    }).promise(),
    // ...fs.readdirSync('./assets').map((val) => {
    //     return s3.upload({
    //         Bucket: process.env.bucket,
    //         Body: fs.readFileSync('./assets/' + val).toString(),
    //         Key: val,
    //         ContentType: 'image/png'
    //     }).promise()
    // })
];

Promise.all(promises)
    .then(console.log)
    .catch(console.error);