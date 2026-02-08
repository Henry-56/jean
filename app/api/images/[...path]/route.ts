
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

const r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathArray } = await params;
        // Reconstruct the key from the path segments
        // e.g. /api/images/jean/zapatillas/123.jpg -> jean/zapatillas/123.jpg
        const key = pathArray.join('/');

        if (!key) {
            return new NextResponse('Image path missing', { status: 400 });
        }

        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET,
            Key: key,
        });

        const response = await r2.send(command);

        if (!response.Body) {
            return new NextResponse('Image not found', { status: 404 });
        }

        // Convert the stream to a Web ReadableStream
        const stream = response.Body as unknown as ReadableStream;

        // Determine content type
        const contentType = response.ContentType || 'application/octet-stream';

        return new NextResponse(stream, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error fetching image from R2:', error);
        return new NextResponse('Error fetching image', { status: 500 });
    }
}
