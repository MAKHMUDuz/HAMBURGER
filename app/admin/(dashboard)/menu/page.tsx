"use client";

import { useEffect, useState } from "react";
import { Product, Variant, ExtraGroup, getExtraGroups } from "@/lib/definitions";
import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
    PhotoIcon,
    CubeIcon,
    SwatchIcon
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function MenuManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [extraGroups, setExtraGroups] = useState<ExtraGroup[]>([]);
    const [activeTab, setActiveTab] = useState<'general' | 'variants' | 'extras'>('general');

    // Fetch products & extra groups
    const loadData = async () => {
        const [prodRes, groups] = await Promise.all([
            fetch("/api/products").then(r => r.json()),
            getExtraGroups() // In real app, fetch from API
        ]);
        setProducts(prodRes);
        setExtraGroups(groups);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    // Handle Save
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        let updatedProducts: Product[];
        const isNew = !products.find(p => p.id === editingProduct.id);

        if (isNew) {
            if (!editingProduct.id) {
                editingProduct.id = editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
            }
            updatedProducts = [...products, editingProduct];
        } else {
            updatedProducts = products.map((p) =>
                p.id === editingProduct.id ? editingProduct : p
            );
        }

        const res = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProducts),
        });

        if (res.ok) {
            setProducts(updatedProducts);
            setEditingProduct(null);
            setActiveTab('general');
        } else {
            alert("Hata oluştu.");
        }
    };

    const handleCreateNew = () => {
        setEditingProduct({
            id: '',
            name: '',
            description: '',
            price: 0,
            category: 'burgers',
            image: '/images/products/burger-signature.png',
            isAvailable: true,
            stock: 100,
            variants: [],
            extraGroups: []
        });
        setActiveTab('general');
    };

    const addVariant = () => {
        if (!editingProduct) return;
        setEditingProduct({
            ...editingProduct,
            variants: [...(editingProduct.variants || []), { name: 'Yeni Varyasyon', price: 0 }]
        });
    };

    const removeVariant = (index: number) => {
        if (!editingProduct || !editingProduct.variants) return;
        const newVariants = [...editingProduct.variants];
        newVariants.splice(index, 1);
        setEditingProduct({ ...editingProduct, variants: newVariants });
    };

    const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
        if (!editingProduct || !editingProduct.variants) return;
        const newVariants = [...editingProduct.variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setEditingProduct({ ...editingProduct, variants: newVariants });
    };

    const toggleExtraGroup = (groupId: string) => {
        if (!editingProduct) return;
        const current = editingProduct.extraGroups || [];
        const exists = current.includes(groupId);

        let newGroups;
        if (exists) {
            newGroups = current.filter(id => id !== groupId);
        } else {
            newGroups = [...current, groupId];
        }
        setEditingProduct({ ...editingProduct, extraGroups: newGroups });
    };

    if (loading) return <div className="p-8 text-white">Yükleniyor...</div>;

    return (
        <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black font-montserrat text-white">Menü Yönetimi</h1>
                    <p className="text-gray-400 mt-2">Ürünleri, stok durumunu ve özellikleri buradan yönetebilirsiniz.</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                >
                    <PlusIcon className="h-5 w-5" />
                    Yeni Ürün
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div key={product.id} className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-primary/50 transition-all duration-300">
                        <div className="absolute top-3 right-3 z-10">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${product.isAvailable ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {product.isAvailable ? 'Satışta' : 'Kapalı'}
                            </span>
                        </div>

                        <div className="p-5 flex gap-4">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white/5">
                                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white truncate text-lg group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2 mt-1 mb-3">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-xl text-white">{product.price} ₺</span>
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="rounded-lg bg-gray-800 p-2 text-gray-400 hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick usage stats or stock bar could go here */}
                        <div className="bg-gray-950/50 px-5 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-800">
                            <span>Stok: <span className="text-white font-mono">{product.stock || 0}</span></span>
                            <span>{product.category?.toUpperCase()}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <form onSubmit={handleSave} className="w-full max-w-4xl rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                            <div>
                                <h2 className="text-2xl font-bold font-montserrat text-white">
                                    {editingProduct.id ? `Düzenle: ${editingProduct.name}` : 'Yeni Ürün Oluştur'}
                                </h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    {editingProduct.id || 'Yeni Kayıt'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setActiveTab('general')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'general' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}>Genel</button>
                                <button type="button" onClick={() => setActiveTab('variants')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'variants' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}>Varyasyonlar</button>
                                <button type="button" onClick={() => setActiveTab('extras')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'extras' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}>Ekstralar</button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">

                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-bold text-gray-400">Ürün Adı</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={editingProduct.name}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                    className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-white focus:border-primary focus:ring-primary transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-bold text-gray-400">Açıklama</label>
                                                <textarea
                                                    value={editingProduct.description}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                    className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-white focus:border-primary focus:ring-primary transition-all"
                                                    rows={4}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="mb-2 block text-sm font-bold text-gray-400">Fiyat (₺)</label>
                                                    <input
                                                        type="number"
                                                        value={editingProduct.price}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                                        className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-white focus:border-primary focus:ring-primary font-mono text-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-bold text-gray-400">Kategori</label>
                                                    <select
                                                        value={editingProduct.category}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                                                        className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-white focus:border-primary focus:ring-primary"
                                                    >
                                                        <option value="burgers">Burgers</option>
                                                        <option value="chicken">Chicken</option>
                                                        <option value="sides">Sides</option>
                                                        <option value="drinks">Drinks</option>
                                                        <option value="desserts">Desserts</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-bold text-gray-400">Görsel URL</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={editingProduct.image}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                                        className="flex-1 rounded-xl bg-gray-800 border border-gray-700 p-3 text-white text-xs font-mono focus:border-primary focus:ring-primary"
                                                    />
                                                </div>
                                                <div className="mt-4 relative h-48 w-full rounded-xl overflow-hidden bg-black/20 border border-gray-800">
                                                    <Image src={editingProduct.image} alt="Preview" fill className="object-cover" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="mb-2 block text-sm font-bold text-gray-400">Stok</label>
                                                    <input
                                                        type="number"
                                                        value={editingProduct.stock || 0}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                                                        className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-white focus:border-primary focus:ring-primary font-mono"
                                                    />
                                                </div>
                                                <div className="flex items-end pb-3">
                                                    <label className="flex items-center gap-3 cursor-pointer w-full p-3 rounded-xl bg-gray-800 border border-gray-700 hover:border-primary transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            checked={editingProduct.isAvailable !== false}
                                                            onChange={(e) => setEditingProduct({ ...editingProduct, isAvailable: e.target.checked })}
                                                            className="rounded border-gray-600 bg-gray-700 text-primary h-5 w-5"
                                                        />
                                                        <span className="font-bold text-white">Satışa Açık</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'variants' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-white">Varyasyonlar (Gramaj vb.)</h3>
                                        <button type="button" onClick={addVariant} className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-white font-bold transition-colors">
                                            + Ekle
                                        </button>
                                    </div>

                                    {(!editingProduct.variants || editingProduct.variants.length === 0) && (
                                        <div className="text-center py-10 text-gray-500 bg-gray-800/20 rounded-xl border border-dashed border-gray-800">
                                            Varyasyon bulunmuyor. Ekle butonuna basarak oluşturun.
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {editingProduct.variants?.map((variant, idx) => (
                                            <div key={idx} className="flex gap-4 items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-400 mb-1 block">Varyasyon Adı (Örn: 180g)</label>
                                                    <input
                                                        type="text"
                                                        value={variant.name}
                                                        onChange={(e) => updateVariant(idx, 'name', e.target.value)}
                                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white"
                                                    />
                                                </div>
                                                <div className="w-32">
                                                    <label className="text-xs text-gray-400 mb-1 block">Fiyat (₺)</label>
                                                    <input
                                                        type="number"
                                                        value={variant.price}
                                                        onChange={(e) => updateVariant(idx, 'price', Number(e.target.value))}
                                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white font-mono"
                                                    />
                                                </div>
                                                <button type="button" onClick={() => removeVariant(idx)} className="mt-5 p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'extras' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Ekstra Malzeme Grupları</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {extraGroups.map((group) => {
                                            const isSelected = editingProduct.extraGroups?.includes(group.id);
                                            return (
                                                <div
                                                    key={group.id}
                                                    onClick={() => toggleExtraGroup(group.id)}
                                                    className={`cursor-pointer p-4 rounded-xl border transition-all ${isSelected ? 'bg-primary/20 border-primary' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className={`font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>{group.name}</h4>
                                                        {isSelected && <div className="h-3 w-3 rounded-full bg-primary" />}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {group.items.map((item, i) => (
                                                            <span key={i} className="text-xs bg-gray-900 text-gray-400 px-2 py-1 rounded">
                                                                {item.name} (+{item.price}₺)
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="px-6 py-3 rounded-xl bg-gray-800 font-bold text-gray-300 hover:bg-gray-700 transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-primary font-bold text-white hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
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
