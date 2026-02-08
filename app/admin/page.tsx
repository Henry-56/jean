
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { createProduct, deleteProduct } from '@/app/actions';
import { desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function AdminPage() {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Panel de Administración
                        </h1>
                        <p className="text-gray-400">Gestiona el inventario de Jean Sneakers</p>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la tienda
                    </Link>
                </header>

                {/* Formulario de Creación */}
                <section className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <span className="text-green-500 text-xl">✚</span> Agregar Producto
                    </h2>

                    <form action={createProduct} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Nombre del Producto</label>
                                <input
                                    name="name"
                                    required
                                    placeholder="Ej: Nike Dunk Low Retro"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-white focus:outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Precio (S/)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="299.90"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-white focus:outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Talla</label>
                                <input
                                    name="size"
                                    required
                                    placeholder="Ej: 42, M, L"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-white focus:outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Categoría</label>
                                <select
                                    name="category"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-white focus:outline-none transition-all appearance-none"
                                >
                                    <option value="zapatillas">Zapatillas</option>
                                    <option value="ropa">Ropa</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Imagen del Producto</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    required
                                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer text-gray-400 bg-zinc-950 border border-zinc-800 rounded-lg p-2"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors mt-4"
                        >
                            Publicar Producto
                        </button>
                    </form>
                </section>

                {/* Lista de Productos */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">Inventario ({allProducts.length})</h2>

                    <div className="overflow-x-auto rounded-xl border border-zinc-800">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-zinc-900 text-gray-200 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Imagen</th>
                                    <th className="px-6 py-4">Nombre</th>
                                    <th className="px-6 py-4">Precio</th>
                                    <th className="px-6 py-4">Talla</th>
                                    <th className="px-6 py-4">Categoría</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800 bg-black/50">
                                {allProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-4">
                                            {/* Using regular img for admin simple view or specific simple component */}
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="h-12 w-12 rounded-md object-cover border border-zinc-800"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                                        <td className="px-6 py-4">S/{product.price}</td>
                                        <td className="px-6 py-4">{product.size}</td>
                                        <td className="px-6 py-4 capitalise">{product.category}</td>
                                        <td className="px-6 py-4 text-right">
                                            <form action={async () => {
                                                'use server';
                                                await deleteProduct(product.id);
                                            }}>
                                                <button
                                                    type="submit"
                                                    className="text-red-500 hover:text-red-400 font-medium hover:underline"
                                                >
                                                    Eliminar
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                                {allProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No hay productos en el inventario.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
