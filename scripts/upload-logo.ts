
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

async function uploadLogo() {
    const filePath = path.join(process.cwd(), 'public', 'logo.jpeg');

    if (!fs.existsSync(filePath)) {
        console.error('❌ Error: No se encontró public/logo.jpeg');
        console.log('👉 Por favor guarda tu imagen como "logo.jpeg" en la carpeta "public".');
        process.exit(1);
    }

    try {
        const fileContent = fs.readFileSync(filePath);
        const fileName = `jean/logo-${Date.now()}.jpeg`;

        console.log('⏳ Subiendo logo a R2...');

        await r2.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET,
                Key: fileName,
                Body: fileContent,
                ContentType: 'image/jpeg',
            })
        );

        // Since we are using an internal proxy for R2 access in this app:
        const localUrl = `/api/images/${fileName}`;
        console.log('✅ Logo subido exitosamente!');
        console.log(`🔗 URL: ${localUrl}`);

        // Update .env or simply output it for manual update?
        // Ideally we update the codebase to use this URL.
    } catch (error) {
        console.error('❌ Error al subir:', error);
    }
}

uploadLogo();
