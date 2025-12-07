"use client";

import { UserCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function UsersPage() {
    // Mock Data for now
    const users = [
        { id: 1, name: "Ahmet Yılmaz", phone: "0555 555 5555", orders: 12, spend: 3450, status: "active" },
        { id: 2, name: "Ayşe Demir", phone: "0532 222 2222", orders: 3, spend: 450, status: "active" },
        { id: 3, name: "Mehmet Kaya", phone: "0544 444 4444", orders: 1, spend: 120, status: "blocked" },
    ];

    return (
        <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl font-black font-montserrat text-white mb-6">Kullanıcı Yönetimi</h1>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-gray-800 text-gray-200 uppercase font-bold text-xs">
                        <tr>
                            <th className="px-6 py-4">Kullanıcı</th>
                            <th className="px-6 py-4">Telefon</th>
                            <th className="px-6 py-4">Toplam Sipariş</th>
                            <th className="px-6 py-4">Harcama</th>
                            <th className="px-6 py-4">Durum</th>
                            <th className="px-6 py-4 text-right">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                                        <UserCircleIcon className="h-6 w-6" />
                                    </div>
                                    <span className="font-bold text-white">{user.name}</span>
                                </td>
                                <td className="px-6 py-4 font-mono">{user.phone}</td>
                                <td className="px-6 py-4">{user.orders} Adet</td>
                                <td className="px-6 py-4 font-bold text-primary">{user.spend} ₺</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="p-8 text-center text-gray-500">Henüz kullanıcı bulunmuyor.</div>
                )}
            </div>
        </div>
    );
}
