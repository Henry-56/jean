
'use client';

import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { toggleCart, items } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                                <img
                                    src="/api/images/jean/logo-1770568717019.jpeg"
                                    alt="Jean Sneakers Logo"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <span className="text-xl font-black text-white tracking-tighter hidden sm:block">
                                JEAN SNEAKERS
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Inicio
                            </Link>
                            <Link href="#catalogo" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Catálogo
                            </Link>
                            <Link href="#ubicacion" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Ubicación
                            </Link>
                        </div>
                    </div>

                    {/* Cart Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleCart}
                            className="relative bg-white text-black hover:bg-zinc-200 p-2 rounded-full transition-transform hover:scale-105 flex items-center justify-center group"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black animate-in zoom-in">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button - Placeholder for functionality */}
                        <div className="md:hidden">
                            <button className="text-zinc-400 hover:text-white">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
