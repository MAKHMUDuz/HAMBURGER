"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function OrderTracking() {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setStatus(null);

        // Mock API call simulation or real fetch if API supports it
        // Currently only have GET /api/orders (all). 
        // In a real app we'd need GET /api/orders/[id].
        // For demo, we will just simulate success after delay if ID format looks right.

        setTimeout(() => {
            if (orderId.startsWith("F5-")) {
                setStatus({
                    status: "Yola Çıktı",
                    time: "15 dk",
                    items: ["F5 İmza Burger", "Cola Zero"]
                });
            } else {
                setError("Sipariş bulunamadı. Lütfen numarayı kontrol edin.");
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4 flex flex-col items-center">
            <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="font-montserrat text-3xl font-black uppercase text-foreground mb-2">SİPARİŞ TAKİP</h1>
                    <p className="text-gray-500 text-sm">Sipariş numaranı gir, burgerin nerede öğren.</p>
                </div>

                <form onSubmit={handleTrack} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Sipariş No (Örn: F5-2025...)"
                            value={orderId}
                            onChange={e => setOrderId(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-lg py-4 pl-4 pr-12 text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono uppercase"
                            required
                        />
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary py-4 rounded-lg font-bold uppercase tracking-widest text-white hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                        {loading ? "Sorgulanıyor..." : "SORGULA"}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-center text-sm font-bold">
                        {error}
                    </div>
                )}

                {status && (
                    <div className="mt-8 border-t border-white/10 pt-6">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                                <span className="text-3xl">🛵</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase text-foreground">{status.status}</h3>
                                <p className="text-gray-500 font-mono">Tahmini Teslimat: <span className="text-foreground font-bold">{status.time}</span></p>
                            </div>
                            <div className="w-full bg-background rounded p-4 text-left text-sm text-gray-400 mt-2">
                                <p className="uppercase font-bold text-xs mb-2 text-primary">Sipariş İçeriği</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    {status.items.map((i: string) => <li key={i}>{i}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
