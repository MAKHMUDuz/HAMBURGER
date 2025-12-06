"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Product } from "@/lib/menu-data";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import BurgerSVG from "./BurgerSVG";
import { useCart } from "@/lib/cart-context";

interface CustomizerModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

// Mock ingredients for customization scope
const AVAILABLE_EXTRAS = [
    { id: "cheese", name: "Extra Cheese", price: 15 },
    { id: "bacon", name: "Crispy Bacon", price: 25 },
    { id: "patty", name: "Extra Patty", price: 60 },
    { id: "jalapeno", name: "Jalapenos", price: 10 },
    { id: "onion", name: "Crispy Onions", price: 10 },
];

export default function CustomizerModal({ product, isOpen, onClose }: CustomizerModalProps) {
    const [extras, setExtras] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { addItem } = useCart();

    // Calculate Total
    const extrasTotal = extras.reduce((sum, id) => {
        const item = AVAILABLE_EXTRAS.find((e) => e.id === id);
        return sum + (item?.price || 0);
    }, 0);
    const finalPrice = (product.price + extrasTotal) * quantity;

    // Toggle Extra
    const toggleExtra = (id: string) => {
        setExtras((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (isOpen) {
            // Open Animation
            gsap.fromTo(
                modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(
                contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.2)" }
            );
        }
    }, [isOpen]);

    const handleAddToOrder = () => {
        addItem({
            product,
            quantity,
            extras: extras.map(id => AVAILABLE_EXTRAS.find(e => e.id === id)?.name || id),
            totalPrice: finalPrice,
            uniqueId: Math.random().toString(36).substr(2, 9),
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <div
                ref={contentRef}
                className="relative flex h-full max-h-[800px] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A] text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] md:flex-row"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 hover:bg-red-600 transition-colors"
                >
                    <XMarkIcon className="h-6 w-6 text-white" />
                </button>

                {/* Visual Side (Left) */}
                <div className="flex flex-1 items-center justify-center bg-black/40 p-8 relative overflow-hidden">
                    {/* Ambient Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />

                    <div className="relative z-10 w-full max-w-[350px]">
                        <BurgerSVG className="w-full drop-shadow-2xl" />
                        {/* Simulated Extra Layers visual */}
                        {extras.includes("cheese") && (
                            <div className="absolute top-[45%] left-0 w-full h-[20px] bg-yellow-400 opacity-80 blur-md rounded-full animate-pulse z-20" />
                        )}
                        {extras.includes("bacon") && (
                            <div className="absolute top-[55%] left-0 w-full h-[10px] bg-orange-600 opacity-60 blur-md rounded-full z-20" />
                        )}
                    </div>
                </div>

                {/* Controls Side (Right) */}
                <div className="flex flex-1 flex-col p-8 md:p-10 bg-surface">
                    <div className="mb-6">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                            Customize Your
                        </span>
                        <h2 className="font-montserrat text-4xl font-black uppercase leading-none tracking-tight">
                            {product.name}
                        </h2>
                        <p className="mt-4 text-sm text-gray-400">{product.description}</p>
                    </div>

                    {/* Ingredients / Extras */}
                    <div className="mb-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="mb-4 font-mono text-sm font-bold text-gray-500 uppercase">Add Extras</h3>
                        <div className="space-y-3">
                            {AVAILABLE_EXTRAS.map((extra) => (
                                <div
                                    key={extra.id}
                                    onClick={() => toggleExtra(extra.id)}
                                    className={cn(
                                        "flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-all",
                                        extras.includes(extra.id)
                                            ? "border-primary bg-primary/10 shadow-[0_0_10px_rgba(229,25,41,0.2)]"
                                            : "border-white/5 bg-white/5 hover:bg-white/10"
                                    )}
                                >
                                    <span className="font-bold text-sm">{extra.name}</span>
                                    <span className="font-mono text-xs text-primary">+{extra.price} TL</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Add */}
                    <div className="border-t border-white/10 pt-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-4 rounded-full border border-white/10 bg-black/20 px-4 py-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="rounded-full hover:text-primary"
                                >
                                    <MinusIcon className="h-4 w-4" />
                                </button>
                                <span className="w-4 text-center font-mono font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="rounded-full hover:text-primary"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-500">Total Price</span>
                                <span className="font-roboto-mono text-2xl font-bold text-accent-neon font-glow">
                                    {finalPrice} TL
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToOrder}
                            className="w-full rounded-lg bg-primary py-4 font-montserrat text-base font-bold uppercase tracking-widest text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_#E51929] clip-path-slant"
                            style={{ clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0% 100%)" }}
                        >
                            Add to Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
