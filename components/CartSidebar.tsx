
'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';
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
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51943677832';

        let message = "👋 ¡Hola Apicultura Elite! 🐝 Quiero realizar el siguiente pedido:\n\n";
        items.forEach((item) => {
            message += `• ${item.quantity}x ${item.name} (${item.size}) - S/${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n💰 *TOTAL ESTIMADO: S/${total.toFixed(2)}*\n\n¿Podrían confirmarme disponibilidad y métodos de entrega?`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[200] flex justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-500">
            <div
                ref={sidebarRef}
                className="w-full max-w-md bg-white border-l border-zinc-100 h-full shadow-[0_0_80px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500"
            >
                {/* Header */}
                <div className="p-8 border-b border-zinc-50 flex justify-between items-center bg-zinc-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFB900] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-100">
                            <ShoppingBag className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-zinc-900 tracking-tight">Tu Orden</h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                {items.reduce((acc, item) => acc + item.quantity, 0)} PRODUCTOS SELECCIONADOS
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-3 hover:bg-white rounded-2xl text-zinc-400 hover:text-zinc-900 transition-all border border-transparent hover:border-zinc-200 shadow-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-24 h-24 bg-zinc-50 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-zinc-200">
                                <ShoppingBag className="w-10 h-10 text-zinc-300" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-zinc-900 font-black text-xl">Tu carrito está vacío</p>
                                <p className="text-zinc-500 text-sm">Parece que aún no has cosechado nada.</p>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="px-8 py-3 bg-zinc-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
                            >
                                SEGUIR EXPLORANDO
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-5 group">
                                <div className="relative w-24 h-24 bg-zinc-50 rounded-[1.5rem] overflow-hidden border border-zinc-100 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                    <div className="space-y-1">
                                        <h3 className="text-zinc-900 font-black truncate text-lg group-hover:text-[#b8860b] transition-colors">{item.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                {item.size}
                                            </span>
                                            <span className="text-zinc-400 font-bold text-xs uppercase">CANTIDAD: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-zinc-900 font-black text-xl">S/{item.price * item.quantity}</span>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-zinc-300 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-lg"
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
                    <div className="p-8 bg-zinc-50/80 backdrop-blur-md border-t border-zinc-100 space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Total Estimado</span>
                            <span className="text-3xl font-black text-zinc-900">S/{total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-[#FFB900] hover:bg-black hover:text-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-yellow-100/50 hover:shadow-zinc-200"
                        >
                            <MessageSquare className="w-5 h-5" />
                            <span className="uppercase tracking-widest text-sm">ORDENAR POR WHATSAPP</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-[0.15em]">
                            * El pago y envío se coordinan directamente
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
