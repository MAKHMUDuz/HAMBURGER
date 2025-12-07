"use client";

import { Squares2X2Icon, BanknotesIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export default function AdminDashboard() {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-black font-montserrat text-white mb-8">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Günlük Ciro" value="12.450 ₺" icon={BanknotesIcon} color="bg-green-500" />
                <StatCard title="Bekleyen Sipariş" value="4" icon={ShoppingBagIcon} color="bg-amber-500" />
                <StatCard title="Toplam Sipariş" value="142" icon={Squares2X2Icon} color="bg-blue-500" />
                <StatCard title="Yeni Müşteri" value="12" icon={UserGroupIcon} color="bg-purple-500" />
            </div>

            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
                <h2 className="text-xl font-bold font-montserrat text-white mb-4">Son Siparişler</h2>
                <div className="text-gray-500 text-center py-10">
                    Henüz sipariş verisi yok (Mock Data)
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 flex items-center gap-4 hover:border-gray-700 transition-colors">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-gray-400 font-medium">{title}</p>
                <h3 className="text-2xl font-black text-white font-mono">{value}</h3>
            </div>
        </div>
    );
}
