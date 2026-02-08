
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Jean Sneakers Huancayo',
        short_name: 'Jean Sneakers',
        description: 'La mejor selección de Streetwear y Sneakers exclusivos en Huancayo.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/api/images/jean/logo-1770568717019.jpeg',
                sizes: 'any',
                type: 'image/jpeg',
            },
        ],
    };
}
