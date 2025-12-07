"use client";

import { useState, useEffect } from "react";
import { TicketIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Campaign } from "@/lib/definitions";

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState<Partial<Campaign>>({
        code: "",
        type: "percent",
        value: 10,
        minCartAmount: 0,
        usageLimit: 100,
        isActive: true
    });

    const fetchCampaigns = async () => {
        const res = await fetch("/api/campaigns");
        if (res.ok) {
            setCampaigns(await res.json());
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/campaigns", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setIsModalOpen(false);
            fetchCampaigns();
            setFormData({ code: "", type: "percent", value: 10, minCartAmount: 0, usageLimit: 100, isActive: true });
        } else {
            alert("Hata oluştu.");
        }
    };

    return (
        <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black font-montserrat text-white">Kampanyalar & Kuponlar</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:brightness-110 text-white font-bold py-2 px-4 rounded-xl transition-all"
                >
                    <PlusIcon className="h-5 w-5" />
                    Yeni Kupon
                </button>
            </div>

            {loading ? (
                <div className="text-white text-center py-10">Yükleniyor...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((camp) => (
                        <div key={camp.id} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <TicketIcon className="h-32 w-32 -mr-8 -mt-8 text-primary" />
                            </div>

                            <div className="relative z-10">
                                <span className={`text-xs font-bold px-2 py-1 rounded mb-4 inline-block ${camp.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>
                                    {camp.isActive ? 'AKTİF' : 'PASİF'}
                                </span>
                                <h3 className="text-2xl font-black text-white mb-1 tracking-wider">{camp.code}</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {camp.type === 'percent' ? `%${camp.value} İndirim` : `${camp.value}₺ İndirim`}
                                    {camp.minCartAmount ? ` (Min: ${camp.minCartAmount}₺)` : ''}
                                </p>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-500">Kullanım</p>
                                        <p className="font-mono text-white font-bold">{camp.usedCount} / {camp.usageLimit || '∞'}</p>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Limit: {camp.usageLimit || "Sınırsız"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {campaigns.length === 0 && (
                        <div className="col-span-full bg-gray-900/50 border border-dashed border-gray-800 p-10 rounded-2xl flex flex-col items-center justify-center text-center text-gray-500">
                            <TicketIcon className="h-12 w-12 mb-2 opacity-50" />
                            <p>Henüz kampanya oluşturulmamış.</p>
                        </div>
                    )}
                </div>
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Yeni Kampanya Oluştur</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Kupon Kodu</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white uppercase font-mono tracking-wider focus:border-primary focus:ring-primary"
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    placeholder="ÖR: YAZ2025"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">İndirim Tipi</label>
                                    <select
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                    >
                                        <option value="percent">Yüzde (%)</option>
                                        <option value="fixed">Tutar (₺)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Değer</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white"
                                        value={formData.value}
                                        onChange={e => setFormData({ ...formData, value: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Min Sepet Tutarı (₺)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white"
                                        value={formData.minCartAmount}
                                        onChange={e => setFormData({ ...formData, minCartAmount: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Kullanım Limiti</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white"
                                        value={formData.usageLimit}
                                        onChange={e => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary hover:brightness-110 text-white font-bold py-3 rounded-xl mt-4">
                                Oluştur
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
