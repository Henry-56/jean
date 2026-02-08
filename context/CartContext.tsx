
'use strict';
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    size: string;
    imageUrl: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string, size: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('drip-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('drip-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id && item.size === product.size);
            if (existing) {
                toast.success(`Se agregó otro ${product.name} (Talla: ${product.size})`);
                return prev.map((item) =>
                    item.id === product.id && item.size === product.size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.success(`${product.name} agregado al carrito`);
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string, size: string) => {
        setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
        toast.info('Producto eliminado del carrito');
    };

    const clearCart = () => {
        setItems([]);
        toast.info('Carrito vaciado');
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                clearCart,
                isCartOpen,
                toggleCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
