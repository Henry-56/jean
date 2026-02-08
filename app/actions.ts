
'use server';

import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { uploadImageToR2 } from '@/lib/r2';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const size = formData.get('size') as string;
    const category = formData.get('category') as string;
    const image = formData.get('image') as File;

    if (!name || !price || !size || !category || !image) {
        throw new Error('Missing required fields');
    }

    const imageUrl = await uploadImageToR2(image, `jean/${category}`);

    await db.insert(products).values({
        name,
        price: price, // drizzle decimal expects string or number
        size,
        category,
        imageUrl,
    });

    revalidatePath('/');
}

export async function deleteProduct(id: string) {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath('/');
}
