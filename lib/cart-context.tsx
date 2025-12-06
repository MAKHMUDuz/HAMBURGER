"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./menu-data";

export interface CartItem {
    product: Product;
    quantity: number;
    extras: string[];
    totalPrice: number;
    uniqueId: string; // for key
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (uniqueId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    toggleDrawer: () => void;
    isDrawerOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Load from local storage (optional, simple version here)
    useEffect(() => {
        const saved = localStorage.getItem("f5-cart");
        if (saved) setItems(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("f5-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: CartItem) => {
        setItems((prev) => [...prev, newItem]);
        setIsDrawerOpen(true);
    };

    const removeItem = (uniqueId: string) => {
        setItems((prev) => prev.filter((i) => i.uniqueId !== uniqueId));
    };

    const clearCart = () => setItems([]);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const cartTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, cartTotal, toggleDrawer, isDrawerOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
