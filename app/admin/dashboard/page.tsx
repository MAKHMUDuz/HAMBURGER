"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/product-db";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const router = useRouter();

    // Fetch products
    const loadProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handle Save
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        const updatedProducts = products.map((p) =>
            p.id === editingProduct.id ? editingProduct : p
        );

        const res = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProducts),
        });

        if (res.ok) {
            setProducts(updatedProducts);
            setEditingProduct(null);
        } else {
            alert("Hata oluştu.");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-black">Yükleniyor...</div>;

    return (
        <div className="min-h-screen bg-gray-950 text-white font-inter">
            {/* Header */}
            <nav className="border-b border-gray-800 bg-gray-900 p-4 sticky top-0 z-40">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl font-black font-montserrat text-primary">F5 PANEL</Link>
                        <div className="hidden md:block h-6 w-px bg-gray-700"></div>
                        <Link href="/" className="hidden md:block text-sm text-gray-400 hover:text-white">Siteye Dön</Link>
                    </div>
                    <button
                        onClick={() => router.push('/admin')}
                        className="text-sm font-bold text-gray-400 hover:text-white"
                    >
                        Çıkış
                    </button>
                </div>
            </nav>

            <div className="container mx-auto py-8 px-4">
                <h1 className="mb-6 text-2xl font-bold font-montserrat">Menü Yönetimi</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div key={product.id} className="flex gap-4 rounded-xl border border-gray-800 bg-gray-900 p-4 hover:border-gray-700 transition-colors">
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-white line-clamp-1">{product.name}</h3>
                                    <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-mono font-bold text-primary">{product.price} ₺</span>
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="rounded bg-gray-800 p-2 text-gray-400 hover:bg-primary hover:text-white transition-colors"
                                        title="Düzenle"
                                    >
                                        <PencilSquareIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <form onSubmit={handleSave} className="w-full max-w-lg rounded-2xl bg-gray-900 border border-gray-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <h2 className="mb-4 text-xl font-bold font-montserrat flex justify-between items-center">
                            <span>Düzenle: {editingProduct.name}</span>
                            <span className="text-xs font-mono text-gray-500 px-2 py-1 bg-gray-800 rounded">{editingProduct.id}</span>
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm text-gray-400">Ürün Adı</label>
                                <input
                                    type="text"
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    className="w-full rounded bg-gray-800 border border-gray-700 p-2 text-white focus:border-primary focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-400">Açıklama</label>
                                <textarea
                                    value={editingProduct.description}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                    className="w-full rounded bg-gray-800 border border-gray-700 p-2 text-white focus:border-primary focus:ring-primary"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm text-gray-400">Fiyat (₺)</label>
                                    <input
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                        className="w-full rounded bg-gray-800 border border-gray-700 p-2 text-white focus:border-primary focus:ring-primary font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-gray-400">Kategori</label>
                                    <select
                                        value={editingProduct.category}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                                        className="w-full rounded bg-gray-800 border border-gray-700 p-2 text-white focus:border-primary focus:ring-primary"
                                    >
                                        <option value="burgers">Burgers</option>
                                        <option value="chicken">Chicken</option>
                                        <option value="sides">Sides</option>
                                        <option value="drinks">Drinks</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-400">Görsel URL</label>
                                <input
                                    type="text"
                                    value={editingProduct.image}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                    className="w-full rounded bg-gray-800 border border-gray-700 p-2 text-white text-xs font-mono focus:border-primary focus:ring-primary"
                                />
                                <div className="mt-2 text-xs text-gray-500">Mevcut: {editingProduct.image}</div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="flex-1 rounded-lg bg-gray-800 py-2 font-bold text-gray-300 hover:bg-gray-700"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="flex-1 rounded-lg bg-primary py-2 font-bold text-white hover:brightness-110"
                            >
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
