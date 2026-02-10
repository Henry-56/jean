
'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { toggleCart, items } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-white/90 backdrop-blur-xl shadow-xl shadow-zinc-200/50' : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 bg-white/50 backdrop-blur-md px-6 rounded-3xl border border-zinc-100 shadow-sm">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FFB900] to-[#E6A600] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-200/50 transform group-hover:rotate-12 transition-transform">
                                <span className="text-black font-black text-xl">A</span>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-lg font-black text-zinc-900 tracking-tighter">
                                    APICULTURA<span className="text-[#FFB900]">ELITE</span>
                                </span>
                                <span className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase">Excelencia Pura</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Menu (Hidden on mobile) */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-zinc-600 hover:text-zinc-900 text-sm font-bold uppercase tracking-widest transition-colors relative group">
                            Inicio
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFB900] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="#catalogo" className="text-zinc-600 hover:text-zinc-900 text-sm font-bold uppercase tracking-widest transition-colors relative group">
                            Productos
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFB900] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="#ubicacion" className="text-zinc-600 hover:text-zinc-900 text-sm font-bold uppercase tracking-widest transition-colors relative group">
                            Contacto
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFB900] transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Actions Area */}
                    <div className="flex items-center gap-2">
                        <Link href="/admin" className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors hidden sm:flex">
                            <User className="w-5 h-5" />
                        </Link>

                        <div className="w-px h-6 bg-zinc-200 mx-1 hidden sm:block"></div>

                        <button
                            onClick={toggleCart}
                            className="relative bg-[#FFB900] text-black hover:bg-[#E6A600] p-3 rounded-2xl transition-all hover:scale-105 shadow-md shadow-yellow-200 active:scale-95 group flex items-center gap-2 px-5"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="text-sm font-black hidden sm:block">MI PEDIDO</span>
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-xl border-2 border-white animate-bounce-short">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        <button className="md:hidden p-2 text-zinc-900">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
