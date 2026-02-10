
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { createProduct, deleteProduct } from '@/app/actions';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { ArrowLeft, Plus, Package, Trash2, ExternalLink } from 'lucide-react';

export default async function AdminPage() {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen bg-zinc-50/50 text-zinc-900 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#FFB900] font-black tracking-widest text-xs uppercase">
                            <div className="w-2 h-2 bg-[#FFB900] rounded-full animate-pulse"></div>
                            Portal de Control
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-zinc-900">
                            Inventario <span className="text-[#FFB900]">Elite</span>
                        </h1>
                        <p className="text-zinc-500 font-medium">Gestiona los productos de Apicultura Elite Huancayo.</p>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-50 rounded-xl text-sm font-bold transition-all border border-zinc-200 shadow-sm hover:border-zinc-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ver Tienda
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Formulario de Creación */}
                    <section className="lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 h-fit sticky top-8">
                        <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <Plus className="w-6 h-6 text-[#FFB900]" />
                            Nuevo Producto
                        </h2>

                        <form action={createProduct} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Nombre</label>
                                <input
                                    name="name"
                                    required
                                    placeholder="Ej: Miel de Eucalipto 1kg"
                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#FFB900] focus:outline-none transition-all placeholder:text-zinc-300 font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Precio (S/)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        required
                                        placeholder="45.00"
                                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#FFB900] focus:outline-none transition-all placeholder:text-zinc-300 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Talla/Peso</label>
                                    <input
                                        name="size"
                                        required
                                        placeholder="Ej: 1kg, L, Única"
                                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#FFB900] focus:outline-none transition-all placeholder:text-zinc-300 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Categoría</label>
                                <select
                                    name="category"
                                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#FFB900] focus:outline-none transition-all appearance-none font-medium cursor-pointer"
                                >
                                    <option value="miel">Miel Pura</option>
                                    <option value="herramientas">Herramientas</option>
                                    <option value="equipos">Equipos</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Imagen</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    required
                                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#FFB900] file:text-black hover:file:opacity-80 cursor-pointer text-zinc-400 bg-zinc-50 border border-zinc-100 rounded-xl p-2"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white font-black py-4 px-6 rounded-xl hover:bg-zinc-800 transition-all mt-4 shadow-lg shadow-zinc-200 uppercase tracking-widest text-xs"
                            >
                                Publicar Producto
                            </button>
                        </form>
                    </section>

                    {/* Lista de Productos */}
                    <section className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <Package className="w-6 h-6 text-[#FFB900]" />
                                Stock Actual ({allProducts.length})
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {allProducts.map((product) => (
                                <div key={product.id} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="h-20 w-20 rounded-2xl object-cover border border-zinc-50 shadow-sm"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-[#FFB900]/10 text-[#b8860b] text-[10px] font-black rounded-lg uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                            <span className="text-zinc-300">•</span>
                                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{product.size}</span>
                                        </div>
                                        <h3 className="text-lg font-black text-zinc-900 group-hover:text-[#b8860b] transition-colors truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-xl font-black text-zinc-900 mt-1">S/{product.price}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <form action={async () => {
                                            'use server';
                                            await deleteProduct(product.id);
                                        }}>
                                            <button
                                                type="submit"
                                                className="p-3 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}

                            {allProducts.length === 0 && (
                                <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-zinc-100">
                                    <Package className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                                    <p className="text-zinc-400 font-bold">No hay productos en el inventario.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
