
'use client';

import { ShoppingCart, Check } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
    id: string;
    name: string;
    price: string;
    size: string;
    imageUrl: string;
    description?: string | null;
}

export default function ProductCard({ id, name, price, size, imageUrl, description }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            id,
            name,
            price: parseFloat(price),
            size,
            imageUrl,
        });

        // Reset button state after animation
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <div className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-zinc-100 hover:border-[#FFB900]/30 transition-all duration-700 shadow-xl shadow-zinc-100/50 hover:shadow-2xl hover:shadow-yellow-100/30 flex flex-col h-full hover:-translate-y-2">
            {/* Image Container */}
            <div className="aspect-[4/5] relative overflow-hidden bg-zinc-50 rounded-t-[2.5rem]">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/20">
                    <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">{size}</span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-8 space-y-6 flex flex-col flex-1">
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-zinc-900 group-hover:text-[#b8860b] transition-colors line-clamp-1" title={name}>
                        {name}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed h-10 font-medium italic">
                        {description || 'Equipamiento de máxima pureza y rendimiento profesional.'}
                    </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Precio</span>
                        <p className="text-3xl font-black text-zinc-900">S/{price}</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`p-5 rounded-2xl flex items-center justify-center transition-all duration-500 ${isAdding
                            ? 'bg-green-500 text-white scale-95 shadow-lg shadow-green-100'
                            : 'bg-[#FFB900] text-black hover:bg-black hover:text-white hover:shadow-xl active:scale-95 shadow-lg shadow-yellow-100'
                            }`}
                        aria-label="Añadir al carrito"
                    >
                        {isAdding ? (
                            <Check className="w-6 h-6 animate-in zoom-in" />
                        ) : (
                            <ShoppingCart className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
