"use client";

import { useEffect, useState } from "react";
// import { menuProducts, Product } from "@/lib/menu-data"; // OLD static import
import { Product } from "@/lib/definitions"; // Interface only
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import CustomizerPanel from "./CustomizerPanel";

const CATEGORIES = [
    { id: "all", label: "TÜMÜ" },
    { id: "burgers", label: "BURGERLER" },
    { id: "chicken", label: "TAVUK" },
    { id: "sides", label: "YAN LEZZETLER" },
    { id: "drinks", label: "İÇECEKLER" },
];

export default function MenuGrid() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // FETCH DATA FROM API TO ALLOW ADMIN UPDATES
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (loading) return (
        <section className="py-24 text-center">
            <p className="animate-pulse font-mono text-gray-500">MENÜ YÜKLENİYOR...</p>
        </section>
    );

    return (
        <section className="py-24 transition-colors duration-300" style={{ backgroundColor: "var(--background)" }}>
            <div className="container-custom">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="font-montserrat text-4xl font-black text-gray-900 dark:text-white md:text-6xl mb-4 tracking-tight">
                        F5 MENÜ
                    </h2>
                    <p className="text-gray-500 font-mono text-lg uppercase tracking-widest">Hadi birisini seç.</p>
                </div>

                {/* Filter Tabs */}
                <div className="mb-16 flex flex-wrap justify-center gap-3">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all",
                                    isActive ? "shadow-lg scale-105" : "hover:opacity-80"
                                )}
                                style={{
                                    backgroundColor: isActive ? "#FF4E42" : "var(--bg-card)",
                                    color: isActive ? "#ffffff" : "var(--text-primary)"
                                }}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Grid - 4 Columns on Desktop as requested */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onCustomize={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>
            </div>

            {/* Customizer Slide-Over Panel */}
            <CustomizerPanel
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
}
