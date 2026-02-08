
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function uploadImageToR2(file: File, folder: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s/g, '-')}`;

    await r2.send(
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
            ACL: 'public-read', // Depends on bucket settings, but usually R2 buckets are private unless specific public access is configured or you use a worker. Based on prompt R2_PUBLIC_URL is provided, implying public access via custom domain or r2.dev
        })
    );

    // Return local API URL to proxy the image access securely
    return `/api/images/${fileName}`;
}
