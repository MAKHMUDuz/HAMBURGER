"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, BanknotesIcon, CreditCardIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import OrderReceipt from "@/app/components/OrderReceipt";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        neighborhood: "",
        buildingNo: "",
        note: "",
        paymentMethod: "cash_door" // cash_door | card_door | online
    });
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsOrdering(true);

        // Simulate API Call
        try {
            const fullAddress = `${formData.address}, ${formData.neighborhood}, Bina: ${formData.buildingNo}`;

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    fullAddress,
                    items,
                    total: cartTotal
                })
            });

            const data = await res.json();

            if (data.success) {
                setOrderSuccess(data);
                clearCart();
            } else {
                alert("Sipariş oluşturulamadı!");
            }
        } catch (err) {
            console.error(err);
            alert("Hata oluştu.");
        } finally {
            setIsOrdering(false);
        }
    };

    if (orderSuccess) {
        return (
            <OrderReceipt
                order={orderSuccess}
                onClose={() => window.location.href = "/"}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 transition-colors duration-300">
            <div className="container-custom grid gap-12 lg:grid-cols-2">
                {/* Form Section */}
                <div>
                    <h1 className="mb-8 font-montserrat text-3xl font-black uppercase text-foreground">Ödeme & Adres</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase text-gray-500">İletişim</h3>
                            <input
                                type="text"
                                required
                                placeholder="Ad Soyad"
                                className="w-full rounded border border-white/10 bg-surface p-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="tel"
                                required
                                placeholder="Telefon (5XXXXXXXXX)"
                                pattern="[0-9]{10,12}"
                                className="w-full rounded border border-white/10 bg-surface p-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase text-gray-500">Adres Detayları</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    required
                                    placeholder="Mahalle"
                                    className="w-full rounded border border-white/10 bg-surface p-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={formData.neighborhood}
                                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                                />
                                <input
                                    type="text"
                                    required
                                    placeholder="Bina No / Daire"
                                    className="w-full rounded border border-white/10 bg-surface p-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={formData.buildingNo}
                                    onChange={e => setFormData({ ...formData, buildingNo: e.target.value })}
                                />
                            </div>
                            <textarea
                                required
                                placeholder="Sokak / Cadde / Tarif"
                                rows={3}
                                className="w-full rounded border border-white/10 bg-surface p-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Sipariş Notu (Opsiyonel)"
                                className="w-full rounded border border-white/10 bg-surface p-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                value={formData.note}
                                onChange={e => setFormData({ ...formData, note: e.target.value })}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase text-gray-500">Ödeme Yöntemi</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { id: "cash_door", label: "Kapıda Nakit", icon: BanknotesIcon },
                                    { id: "card_door", label: "Kapıda Kart", icon: CreditCardIcon },
                                    { id: "online", label: "Online Ödeme", icon: GlobeAltIcon },
                                ].map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                                        className={cn(
                                            "cursor-pointer rounded border p-4 transition-all flex flex-col items-center justify-center gap-2 text-center",
                                            formData.paymentMethod === method.id
                                                ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                                                : "border-white/10 bg-surface hover:bg-white/5 text-gray-500"
                                        )}
                                    >
                                        <method.icon className="h-6 w-6" />
                                        <span className="text-xs font-bold uppercase">{method.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isOrdering || items.length === 0}
                            className="mt-8 w-full rounded bg-success py-4 font-montserrat text-lg font-bold uppercase tracking-widest text-white transition-all hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/20"
                        >
                            {isOrdering ? "İşleniyor..." : `Siparişi Tamamla • ${cartTotal} TL`}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="rounded-2xl border border-white/10 bg-surface p-8 h-fit shadow-xl">
                    <h3 className="mb-6 font-montserrat text-xl font-bold uppercase text-foreground">Sepet Özeti</h3>
                    <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {items.map((item) => (
                            <div key={item.uniqueId} className="flex justify-between border-b border-white/5 pb-4 last:border-0">
                                <div>
                                    <span className="font-bold text-foreground block">{item.quantity}x {item.product.name}</span>
                                    <span className="text-sm text-gray-500">{item.extras.join(", ")}</span>
                                </div>
                                <span className="font-mono text-primary font-bold">{item.totalPrice} TL</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-500">
                            <span>Ara Toplam</span>
                            <span>{cartTotal} TL</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Teslimat Ücreti</span>
                            <span>0 TL</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-primary mt-4">
                            <span>TOPLAM</span>
                            <span>{cartTotal} TL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
