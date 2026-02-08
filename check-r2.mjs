
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Load .env.local manually
dotenv.config({ path: '.env.local' });

const r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

async function listFiles() {
    try {
        console.log(`🔍 Conectando a Cloudflare R2 (Bucket: ${process.env.R2_BUCKET})...`);
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET,
        });
        const response = await r2.send(command);

        if (!response.Contents || response.Contents.length === 0) {
            console.log('❌ El bucket está vacío.');
        } else {
            console.log(`✅ ¡ÉXITO! Encontré ${response.Contents.length} archivo(s) en la nube:`);
            response.Contents.forEach((file) => {
                console.log(` 📄 ${file.Key} (${(file.Size / 1024).toFixed(2)} KB) - ${file.LastModified}`);
            });
        }
    } catch (error) {
        console.error('❌ Error al conectar con R2:', error);
    }
}

listFiles();
