"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
    const { items, removeItem, isDrawerOpen, toggleDrawer, cartTotal } = useCart();

    // Coupon State
    const [couponCode, setCouponCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [verifying, setVerifying] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null); // Type 'Campaign' ideally
    const [couponMessage, setCouponMessage] = useState("");

    const handleApplyCoupon = async () => {
        setVerifying(true);
        setCouponMessage("");
        try {
            const res = await fetch("/api/campaigns/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: couponCode, cartTotal }),
            });
            const data = await res.json();

            if (data.isValid) {
                setAppliedCoupon(data.campaign);
                setDiscountAmount(data.discountAmount);
                setCouponMessage("Kupon başarıyla uygulandı!");
            } else {
                setAppliedCoupon(null);
                setDiscountAmount(0);
                setCouponMessage(data.message || "Geçersiz kupon.");
            }
        } catch (error) {
            setCouponMessage("Hata oluştu.");
        } finally {
            setVerifying(false);
        }
    };

    return (
        <Transition.Root show={isDrawerOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[60]" onClose={toggleDrawer}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-surface text-foreground shadow-2xl border-l border-white/10"
                                        style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}>

                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            {/* HEADER */}
                                            <div className="flex items-start justify-between border-b border-gray-100 dark:border-white/10 pb-4">
                                                <Dialog.Title className="text-xl font-montserrat font-black uppercase tracking-wide">
                                                    Sepetim
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-[#FF4E42] transition-colors"
                                                        onClick={toggleDrawer}
                                                    >
                                                        <span className="sr-only">Kapat</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                {items.length === 0 ? (
                                                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                                                        <span className="text-6xl mb-4 grayscale">🍔</span>
                                                        <p className="font-montserrat font-bold text-lg">Sepetin şu an boş.</p>
                                                        <button
                                                            onClick={toggleDrawer}
                                                            className="mt-4 text-[#FF4E42] underline font-bold hover:text-red-500"
                                                        >
                                                            Hadi bir şeyler seç!
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-100 dark:divide-white/10">
                                                            {items.map((item) => (
                                                                <li key={item.uniqueId} className="flex py-6 animate-fadeIn">
                                                                    {/* IMAGE: Real Product Image */}
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 dark:border-white/10 bg-white p-2">
                                                                        <Image
                                                                            src={item.product.image}
                                                                            alt={item.product.name}
                                                                            width={100}
                                                                            height={100}
                                                                            className="h-full w-full object-contain"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-bold text-foreground">
                                                                                <h3 className="line-clamp-2 leading-snug">
                                                                                    {item.product.name}
                                                                                    {item.extras.length > 0 && (
                                                                                        <span className="block text-xs font-normal opacity-60 mt-1">
                                                                                            ({item.extras.join(", ")})
                                                                                        </span>
                                                                                    )}
                                                                                </h3>
                                                                                <p className="ml-4 font-mono text-[#FF4E42] whitespace-nowrap">{item.totalPrice} ₺</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                                                            <p className="opacity-60 font-mono bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">x{item.quantity}</p>

                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeItem(item.uniqueId)}
                                                                                className="font-medium text-[#FF4E42] hover:text-red-600 flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
                                                                            >
                                                                                <TrashIcon className="h-4 w-4" />
                                                                                <span className="text-xs uppercase tracking-wide">Sil</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {items.length > 0 && (
                                            <div className="border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-black/20 px-4 py-6 sm:px-6">

                                                {/* COUPON SECTION */}
                                                <div className="mb-6">
                                                    {!appliedCoupon ? (
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Kupon Kodu"
                                                                className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm uppercase font-mono"
                                                                value={couponCode}
                                                                onChange={(e) => setCouponCode(e.target.value)}
                                                            />
                                                            <button
                                                                onClick={handleApplyCoupon}
                                                                disabled={!couponCode || verifying}
                                                                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-xs font-bold uppercase disabled:opacity-50"
                                                            >
                                                                {verifying ? '...' : 'Uygula'}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex justify-between items-center animate-fadeIn">
                                                            <div>
                                                                <p className="text-green-600 font-bold text-xs">{appliedCoupon.code} Uygulandı</p>
                                                                <p className="text-green-600/70 text-[10px]">{discountAmount} ₺ İndirim</p>
                                                            </div>
                                                            <button
                                                                onClick={() => { setAppliedCoupon(null); setDiscountAmount(0); }}
                                                                className="text-red-400 hover:text-red-500"
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                    {couponMessage && (
                                                        <p className={`text-xs mt-2 ${appliedCoupon ? 'text-green-500' : 'text-red-500'}`}>
                                                            {couponMessage}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex justify-between text-base font-medium text-foreground mb-1">
                                                    <p className="opacity-70 text-sm">Ara Toplam</p>
                                                    <p className="font-mono font-bold text-lg">{cartTotal} ₺</p>
                                                </div>

                                                {appliedCoupon && (
                                                    <div className="flex justify-between text-base font-medium text-green-500 mb-1">
                                                        <p className="text-sm">İndirim ({appliedCoupon.code})</p>
                                                        <p className="font-mono font-bold text-lg">-{discountAmount} ₺</p>
                                                    </div>
                                                )}

                                                <div className="flex justify-between text-base font-medium text-foreground mb-4 pt-2 border-t border-dashed border-gray-300 dark:border-white/10">
                                                    <p className="font-bold">GENEL TOPLAM</p>
                                                    <p className="font-mono font-black text-[#FF4E42] text-2xl">
                                                        {(cartTotal - discountAmount).toFixed(2)} ₺
                                                    </p>
                                                </div>

                                                <p className="mt-0.5 text-xs text-gray-500 mb-6 font-mono">
                                                    Kargo ve vergiler ödeme adımında hesaplanır.
                                                </p>
                                                <div className="mt-6">
                                                    <Link
                                                        href={`/checkout?coupon=${appliedCoupon?.code || ''}`} // Pass coupon to checkout
                                                        onClick={toggleDrawer}
                                                        className="flex items-center justify-center rounded-xl bg-[#FF4E42] px-6 py-4 text-base font-black uppercase tracking-widest text-white shadow-lg shadow-red-500/20 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                                    >
                                                        ÖDEMEYE GEÇ
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm">
                                                    <button
                                                        type="button"
                                                        className="font-bold text-[#FF4E42] hover:text-red-400 transition-colors uppercase tracking-wide text-xs"
                                                        onClick={toggleDrawer}
                                                    >
                                                        Alışverişe Devam Et
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
