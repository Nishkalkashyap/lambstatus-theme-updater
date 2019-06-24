import * as aws from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})

export const s3 = new aws.S3({
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
});