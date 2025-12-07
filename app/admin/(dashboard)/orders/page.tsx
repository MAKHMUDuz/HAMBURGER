"use client";

import { useState, useEffect } from "react";
import { Order, OrderStatus } from "@/lib/definitions"; // We'll need to create an API route to use this
import { ClockIcon, CheckCircleIcon, FireIcon, TruckIcon } from "@heroicons/react/24/outline";

export default function OrderManager() {
    const [orders, setOrders] = useState<Order[]>([]);

    // In a real app, use SWR/React Query for polling
    useEffect(() => {
        // Mock data for now since we haven't built the API route yet
        setOrders([
            {
                id: "ORD-1",
                customerName: "Ahmet Yılmaz",
                customerPhone: "0555...",
                address: "Kadıköy, İstanbul...",
                items: [{ name: "F5 Burger", quantity: 2, price: 380, variant: "180g" }],
                total: 760,
                status: "preparing",
                createdAt: new Date().toISOString(),
                paymentMethod: "card"
            },
            {
                id: "ORD-2",
                customerName: "Ayşe Demir",
                customerPhone: "0532...",
                address: "Beşiktaş...",
                items: [{ name: "Cajun Burger", quantity: 1, price: 250 }],
                total: 250,
                status: "pending",
                createdAt: new Date().toISOString(),
                paymentMethod: "cash"
            }
        ]);
    }, []);

    const columns: { id: OrderStatus, label: string, icon: any, color: string }[] = [
        { id: "pending", label: "Bekliyor", icon: ClockIcon, color: "bg-amber-500/20 text-amber-500 border-amber-500/50" },
        { id: "preparing", label: "Hazırlanıyor", icon: FireIcon, color: "bg-orange-500/20 text-orange-500 border-orange-500/50" },
        { id: "on-way", label: "Yolda", icon: TruckIcon, color: "bg-blue-500/20 text-blue-500 border-blue-500/50" },
        { id: "delivered", label: "Teslim", icon: CheckCircleIcon, color: "bg-green-500/20 text-green-500 border-green-500/50" },
    ];

    return (
        <div className="h-[calc(100vh-4rem)]">
            <h1 className="text-3xl font-black font-montserrat text-white mb-6">Sipariş Yönetimi</h1>

            <div className="grid grid-cols-4 gap-4 h-full overflow-x-auto pb-4">
                {columns.map((col) => (
                    <div key={col.id} className="flex flex-col h-full bg-gray-900/50 rounded-2xl border border-gray-800">
                        {/* Column Header */}
                        <div className={`p-4 border-b border-gray-800 flex items-center gap-2 ${col.color} bg-opacity-10 rounded-t-2xl`}>
                            <col.icon className="h-5 w-5" />
                            <span className="font-bold">{col.label}</span>
                            <span className="ml-auto bg-gray-900 text-xs px-2 py-1 rounded-full text-white">
                                {orders.filter(o => o.status === col.id).length}
                            </span>
                        </div>

                        {/* Cards Container */}
                        <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
                            {orders
                                .filter(o => o.status === col.id)
                                .map((order) => (
                                    <div key={order.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-gray-500 cursor-pointer transition-all hover:-translate-y-1 shadow-lg">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-mono text-gray-400">#{order.id}</span>
                                            <span className="text-xs font-bold text-gray-300">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <h4 className="font-bold text-white mb-1">{order.customerName}</h4>
                                        <div className="space-y-1 mb-3">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="text-sm text-gray-400 flex justify-between">
                                                    <span>{item.quantity}x {item.name} {item.variant}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
                                            <span className="font-bold text-primary">{order.total} ₺</span>
                                            <div className="text-xs px-2 py-1 rounded bg-gray-900 text-gray-500 uppercase">{order.paymentMethod}</div>
                                        </div>

                                        {/* Actions (Mock) */}
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            {col.id === 'pending' && (
                                                <button className="col-span-2 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:brightness-110">
                                                    Onayla
                                                </button>
                                            )}
                                            {col.id === 'preparing' && (
                                                <button className="col-span-2 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:brightness-110">
                                                    Kuryeye Ver
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
