import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand, CreateBucketCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ 
    region: String(process.env.S3_REGION),
    endpoint: String(process.env.S3_ENDPOINT),
    credentials: {
        accessKeyId: String(process.env.S3_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.S3_ACCESS_KEY),
    },
});

export const get = async ({ key }) => {
    const response = await s3Client.send(new GetObjectCommand({
        Bucket: 'lxch-main',
        Key: key,
    }));

    const data = await response.Body?.transformToString();

    return JSON.parse(data ?? 'null');
};

export const put = async ({ key, value }) => {
    const response = await s3Client.send(new PutObjectCommand({
        Bucket: 'lxch-main',
        Key: key,
        Body: JSON.stringify(value),
    }));

    return response;
};
