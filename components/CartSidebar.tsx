
'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function CartSidebar() {
    const { items, isCartOpen, toggleCart, removeFromCart, total } = useCart();
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isCartOpen) {
                toggleCart();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCartOpen, toggleCart]);

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51999999999';

        let message = "👋 Hola Jean Sneakers! Quiero realizar el siguiente pedido:\n\n";
        items.forEach((item) => {
            message += `• ${item.quantity}x ${item.name} (Talla: ${item.size}) - S/${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n💰 *TOTAL A PAGAR: S/${total.toFixed(2)}*\n\n¿Me confirman disponibilidad y métodos de pago?`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                ref={sidebarRef}
                className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
            >
                {/* Header */}
                <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Tu Carrito ({items.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-8 h-8 text-zinc-600" />
                            </div>
                            <p className="text-zinc-500 font-medium">Tu carrito está vacío</p>
                            <button
                                onClick={toggleCart}
                                className="text-white underline text-sm hover:text-zinc-300"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                                <div className="relative w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shrink-0">
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-medium truncate">{item.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                                        <span className="bg-zinc-900 px-2 py-0.5 rounded text-xs border border-zinc-800">
                                            {item.size}
                                        </span>
                                        <span>x{item.quantity}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-white font-bold">S/{item.price * item.quantity}</span>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="p-6 bg-zinc-900/50 border-t border-zinc-900 space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold text-white">
                            <span>Total Estimado</span>
                            <span>S/{total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <MessageSquare className="w-5 h-5" />
                            ORDENAR POR WHATSAPP
                        </button>
                        <p className="text-center text-xs text-zinc-500">
                            * El pago y envío se coordinan por WhatsApp
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
