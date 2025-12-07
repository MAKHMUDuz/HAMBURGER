"use client";

import { Product } from "@/lib/definitions";
import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
    onCustomize: () => void;
}

export default function ProductCard({ product, onCustomize }: ProductCardProps) {
    const isAvailable = product.isAvailable !== false; // Default to true if undefined

    return (
        <div
            className={`rounded-2xl p-5 flex flex-col gap-4 shadow-lg transition-transform hover:scale-[1.02] duration-300 ${!isAvailable ? 'opacity-70 pointer-events-none' : ''}`}
            style={{ backgroundColor: "var(--bg-card)" }}
        >

            {/* GÖRSEL - TALL PORTRAIT FRAME (Aspect 3/4 or 4/5) with OBJECT-COVER */}
            <div className="w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-xl bg-white relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={500}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isAvailable ? 'hover:scale-110' : 'grayscale'}`}
                    loading="lazy"
                />
                {!isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="bg-red-600 text-white font-black px-4 py-2 rounded-lg -rotate-12 transform text-lg border-2 border-white">TÜKENDİ</span>
                    </div>
                )}
            </div>

            {/* METİN */}
            <div>
                <h2
                    className="text-xl font-bold mb-2 font-montserrat"
                    style={{ color: "var(--text-primary)" }}
                >
                    {product.name}
                </h2>
                <p
                    className="text-sm opacity-70 line-clamp-2"
                    style={{ color: "var(--text-primary)" }}
                >
                    {product.description}
                </p>
            </div>

            {/* FİYAT + BUTON */}
            <div className="flex items-center justify-between mt-auto pt-2">
                <span className={`text-lg font-mono font-bold ${isAvailable ? 'text-red-500' : 'text-gray-500'}`}>
                    {product.price} ₺
                </span>

                <button
                    onClick={isAvailable ? onCustomize : undefined}
                    disabled={!isAvailable}
                    className={`px-5 py-2 text-white rounded-lg font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-all ${isAvailable
                        ? 'bg-red-500 hover:opacity-90'
                        : 'bg-gray-500 cursor-not-allowed opacity-50'
                        }`}
                >
                    {isAvailable ? (
                        <>
                            <PlusIcon className="h-4 w-4" />
                            Özelleştir
                        </>
                    ) : (
                        <span>TÜKENDİ</span>
                    )}
                </button>
            </div>

        </div>
    );
}
