"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface OrderReceiptProps {
    order: any;
    onClose: () => void;
}

export default function OrderReceipt({ order, onClose }: OrderReceiptProps) {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            {/* Receipt Container */}
            <div className="relative w-full max-w-sm bg-white text-black font-mono text-sm shadow-2xl overflow-hidden animate-slideUp">

                {/* Jagged Edge Top (CSS Trick or SVG) */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-[linear-gradient(135deg,white_8px,transparent_0),linear-gradient(-135deg,white_8px,transparent_0)] bg-[length:16px_16px] -mt-2"></div>

                <div className="p-6 pt-8 pb-8 flex flex-col items-center">

                    {/* Logo/Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black uppercase tracking-widest border-b-2 border-black/10 pb-2 mb-2">F5 BURGER</h2>
                        <p className="text-xs text-gray-500">Lezzetin Ta Kendisi</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleString()}</p>
                    </div>

                    {/* Order Info */}
                    <div className="w-full text-center border-b-2 border-dashed border-black/20 pb-4 mb-4">
                        <p className="uppercase text-xs text-gray-500">Sipariş No</p>
                        <p className="text-xl font-bold">{order.orderId}</p>
                    </div>

                    {/* Items List */}
                    <div className="w-full space-y-4 mb-6">
                        {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex flex-col border-b border-black/5 pb-2 last:border-0">
                                <div className="flex justify-between font-bold">
                                    <span>{item.quantity}x {item.product.name}</span>
                                    <span>{item.totalPrice} ₺</span>
                                </div>
                                {item.extras && item.extras.length > 0 && (
                                    <div className="mt-1 text-xs text-gray-500 pl-4 border-l-2 border-gray-200">
                                        {item.extras.map((extra: string, i: number) => (
                                            <span key={i} className="block">• {extra}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="w-full border-t-2 border-dashed border-black/20 pt-4 space-y-1">
                        <div className="flex justify-between">
                            <span>Ara Toplam</span>
                            <span>{order.total} ₺</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Teslimat</span>
                            <span>0 ₺</span>
                        </div>
                        <div className="flex justify-between text-xl font-black mt-2 pt-2 border-t border-black/10">
                            <span>TOPLAM</span>
                            <span>{order.total} ₺</span>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="mt-8 text-center space-y-2">
                        <p className="font-bold">AFİYET OLSUN!</p>
                        <p className="text-xs text-gray-400">Bizi tercih ettiğiniz için teşekkürler.</p>
                        {/* Barcode Mockup */}
                        <div className="mt-4 h-12 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,white_2px,white_4px)]"></div>
                    </div>

                </div>

                {/* Close Button UI in Receipt Style */}
                <button
                    onClick={onClose}
                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <XMarkIcon className="h-5 w-5" />
                    Kapat
                </button>

                {/* Jagged Edge Bottom */}
                <div className="absolute bottom-[56px] left-0 right-0 h-4 bg-[linear-gradient(45deg,white_8px,transparent_0),linear-gradient(-45deg,white_8px,transparent_0)] bg-[length:16px_16px] -mb-2 transform rotate-180"></div>

            </div>
        </div>
    );
}
