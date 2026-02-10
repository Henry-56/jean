
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Apicultura Elite Huancayo',
        short_name: 'Apicultura Elite',
        description: 'Equipamiento profesional de apicultura y productos de la colmena premium.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#FFB900',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
