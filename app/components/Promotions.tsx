"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const PROMOS = [
    {
        id: 1,
        title: "GAMER MENÜ",
        desc: "2x Burger + Mega Boy Patates + 1L İçecek",
        price: "450 ₺",
        color: "from-purple-600 to-blue-600",
    },
    {
        id: 2,
        title: "GECE ACIKANLAR",
        desc: "Saat 00:00'dan sonra tüm menülerde %20 indirim!",
        price: "%20 İNDİRİM",
        color: "from-red-600 to-orange-600",
    },
    {
        id: 3,
        title: "İKİLİ AVANTAJ",
        desc: "İkinci Burgerde %50 İndirim Fırsatı",
        price: "FIRSAT",
        color: "from-green-600 to-teal-600",
    }
];

export default function Promotions() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % PROMOS.length);
        }, 5000); // 5 sec rotate
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-10 container-custom">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[250px] md:h-[300px]">
                {PROMOS.map((promo, index) => (
                    <div
                        key={promo.id}
                        className={`absolute inset-0 bg-gradient-to-r ${promo.color} flex items-center px-10 md:px-20 transition-opacity duration-1000 ${index === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="max-w-2xl text-white">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded mb-4 text-sm font-bold tracking-widest uppercase animate-pulse">
                                F5 KAMPANYA
                            </div>
                            <h3 className="font-montserrat font-black text-4xl md:text-6xl mb-2 drop-shadow-md">
                                {promo.title}
                            </h3>
                            <p className="text-lg md:text-2xl font-medium opacity-90 mb-6 font-mono">
                                {promo.desc}
                            </p>
                            <button className="bg-white text-black px-8 py-3 rounded font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2">
                                İncele <ArrowRightIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Price Tag (Floating) */}
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex h-40 w-40 rounded-full bg-white text-black items-center justify-center font-black text-2xl rotate-12 shadow-xl border-4 border-black/10">
                            {promo.price}
                        </div>
                    </div>
                ))}

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {PROMOS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActive(idx)}
                            className={`h-2 w-2 rounded-full transition-all ${idx === active ? 'bg-white w-8' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
