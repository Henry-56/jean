
'use client';

import { MessageSquare, ShoppingCart, Check } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
    id: string;
    name: string;
    price: string;
    size: string;
    imageUrl: string;
}

export default function ProductCard({ id, name, price, size, imageUrl }: ProductCardProps) {
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
        <div className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col h-full">
            <div className="aspect-square relative overflow-hidden bg-zinc-950">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Quick action overlay if needed */}
                </div>
            </div>

            <div className="p-4 space-y-3 flex flex-col flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-zinc-100 line-clamp-1" title={name}>{name}</h3>
                </div>

                <div className="flex justify-between items-center">
                    <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-md font-medium border border-zinc-700">
                        Talla: {size}
                    </span>
                    <p className="text-xl font-extrabold text-white">S/{price}</p>
                </div>

                <div className="mt-auto pt-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`w-full font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${isAdding
                                ? 'bg-green-600 text-white cursor-default scale-95'
                                : 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        {isAdding ? (
                            <>
                                <Check className="w-5 h-5 animate-bounce" />
                                AGREGADO
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-5 h-5" />
                                AGREGAR
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
