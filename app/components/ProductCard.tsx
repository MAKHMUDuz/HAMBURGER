"use client";

import { Product } from "@/lib/menu-data";
import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
    onCustomize: () => void;
}

export default function ProductCard({ product, onCustomize }: ProductCardProps) {
    return (
        <div
            className="rounded-2xl p-5 flex flex-col gap-4 shadow-lg transition-transform hover:scale-[1.02] duration-300"
            style={{ backgroundColor: "var(--bg-card)" }}
        >

            {/* GÖRSEL - TALL PORTRAIT FRAME (Aspect 3/4 or 4/5) with OBJECT-COVER */}
            <div className="w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
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
                <span className="text-lg font-mono font-bold text-red-500">
                    {product.price} ₺
                </span>

                <button
                    onClick={onCustomize}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition-opacity font-bold text-sm uppercase tracking-wide flex items-center gap-2"
                >
                    <PlusIcon className="h-4 w-4" />
                    Özelleştir
                </button>
            </div>

        </div>
    );
}
