"use client";

import { useState } from "react";
import { BellIcon, GlobeAltIcon, PowerIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
    const [isOpen, setIsOpen] = useState(true);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-black font-montserrat text-white mb-8">Ayarlar</h1>

            <div className="space-y-6">
                {/* Restaurant Status */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className={`p-3 rounded-xl ${isOpen ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            <PowerIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Restoran Durumu</h3>
                            <p className="text-gray-400 text-sm">Online sipariş alımını açıp kapatın.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                        <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                </div>

                {/* Notifications */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                            <BellIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Bildirimler</h3>
                            <p className="text-gray-400 text-sm">Sesli sipariş bildirimleri.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                        <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                </div>

                {/* General Info */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="flex gap-4 items-center mb-6">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                            <GlobeAltIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Site Bilgileri</h3>
                            <p className="text-gray-400 text-sm">Genel görünüm ayarları.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Site Başlığı</label>
                            <input type="text" defaultValue="F5 Burger" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Footer Metni</label>
                            <input type="text" defaultValue="© 2025 F5 Burger. Tüm hakları saklıdır." className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white" />
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button className="bg-primary hover:brightness-110 text-white font-bold py-2 px-6 rounded-xl transition-all">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
