"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Product } from "@/lib/product-db"; // Updated to use the DB type
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

interface CustomizerPanelProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const PATTIES = [
    { label: "Tek Köfte", value: "single", price: 0 },
    { label: "Çift Köfte", value: "double", price: 60 },
    { label: "Triple", value: "triple", price: 110 },
];

const SAUCES = [
    { id: "ranch", name: "Ranch Sos", price: 10 },
    { id: "hot", name: "Acı Sos", price: 10 },
    { id: "garlic", name: "Sarımsaklı Mayonez", price: 10 },
    { id: "bbq", name: "Barbekü", price: 10 },
    { id: "truffle", name: "Trüf Mayonez", price: 25 },
];

const EXTRAS = [
    { id: "cheese", name: "Ekstra Peynir", price: 15 },
    { id: "bacon", name: "Dana Bacon", price: 30 },
    { id: "jalapeno", name: "Jalapeno", price: 10 },
    { id: "caramelized", name: "Karamelize Soğan", price: 15 },
];

// NEW: Ingredients to remove (Only for burgers)
const REMOVABLES = [
    { id: "lettuce", name: "Aysberg" },
    { id: "tomato", name: "Domates" },
    { id: "pickle", name: "Turşu" },
    { id: "onion_caramelized", name: "Karamelize Soğan" },
];

export default function CustomizerPanel({ product, isOpen, onClose }: CustomizerPanelProps) {
    const { addItem } = useCart();

    // States
    const [pattyType, setPattyType] = useState("single");
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
    const [removedIngredients, setRemovedIngredients] = useState<string[]>([]); // New State
    const [quantity, setQuantity] = useState(1);

    // Reset when product changes
    useEffect(() => {
        if (isOpen) {
            setPattyType("single");
            setSelectedExtras([]);
            setSelectedSauces([]);
            setRemovedIngredients([]);
            setQuantity(1);
        }
    }, [isOpen, product]);

    if (!product) return null;

    // Price Logic
    const pattyPrice = PATTIES.find(p => p.value === pattyType)?.price || 0;

    const extrasTotal = selectedExtras.reduce((sum, id) => {
        const item = EXTRAS.find(e => e.id === id);
        return sum + (item?.price || 0);
    }, 0);

    const saucesTotal = selectedSauces.reduce((sum, id) => {
        const item = SAUCES.find(e => e.id === id);
        return sum + (item?.price || 0);
    }, 0);

    const singleItemTotal = product.price + pattyPrice + extrasTotal + saucesTotal;
    const finalPrice = singleItemTotal * quantity;

    // Handlers
    const toggleExtra = (id: string) => {
        setSelectedExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    };

    const toggleSauce = (id: string) => {
        setSelectedSauces(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    };

    const toggleRemoval = (id: string) => {
        setRemovedIngredients(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    };

    const handleAddToOrder = () => {
        // Construct array including removals
        const finalExtras = [
            `Köfte: ${PATTIES.find(p => p.value === pattyType)?.label}`,
            ...selectedSauces.map(id => SAUCES.find(s => s.id === id)?.name || id),
            ...selectedExtras.map(id => EXTRAS.find(e => e.id === id)?.name || id),
        ];

        // Add removed items text if any
        if (removedIngredients.length > 0) {
            const removedNames = removedIngredients.map(id => REMOVABLES.find(r => r.id === id)?.name).join(", ");
            finalExtras.push(`Çıkar: ${removedNames}`);
        }

        addItem({
            product,
            quantity,
            extras: finalExtras,
            totalPrice: finalPrice,
            uniqueId: Math.random().toString(36).substr(2, 9),
        });
        onClose();
    };

    const isBurger = product.category === "burgers";

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[60]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
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
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div
                                        className="flex h-full flex-col overflow-y-scroll shadow-2xl"
                                        style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}
                                    >

                                        {/* Header Image Area */}
                                        <div className="relative h-64 w-full bg-white flex items-center justify-center p-6 border-b border-gray-100 dark:border-white/10">
                                            <button
                                                type="button"
                                                className="absolute top-4 right-4 z-10 rounded-full bg-black/10 p-2 text-gray-500 hover:bg-black/20 hover:text-black transition-colors focus:outline-none"
                                                onClick={onClose}
                                            >
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={400}
                                                height={400}
                                                className="h-full w-full object-contain drop-shadow-xl"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="relative flex-1 px-6 py-6 space-y-8">

                                            {/* Title & Desc */}
                                            <div>
                                                <h2 className="text-2xl font-black font-montserrat uppercase leading-none mb-2">
                                                    {product.name}
                                                </h2>
                                                <p className="text-sm opacity-70 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* 1. Patty Count (Köfte Seçimi) */}
                                            <div>
                                                <h3 className="font-bold uppercase text-xs tracking-widest mb-3 opacity-60">Köfte Sayısı</h3>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {PATTIES.map((p) => {
                                                        const isSelected = pattyType === p.value;
                                                        return (
                                                            <button
                                                                key={p.value}
                                                                onClick={() => setPattyType(p.value)}
                                                                className={`py-3 px-2 rounded-xl border-2 text-sm font-bold transition-all flex flex-col items-center justify-center gap-1
                                                                    ${isSelected
                                                                        ? "border-[#FF4E42] bg-[#FF4E42]/5 text-[#FF4E42]"
                                                                        : "border-transparent bg-gray-100 dark:bg-white/5 opacity-80 hover:opacity-100"
                                                                    }
                                                                `}
                                                            >
                                                                <span>{p.label}</span>
                                                                {p.price > 0 && <span className="text-xs font-normal opacity-80">+{p.price}₺</span>}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* NEW: Remove Ingredients (Only for Burgers) */}
                                            {isBurger && (
                                                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                                                    <h3 className="font-bold uppercase text-xs tracking-widest mb-3 text-red-500">Malzeme Çıkar</h3>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {REMOVABLES.map((item) => {
                                                            const isRemoved = removedIngredients.includes(item.id);
                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    onClick={() => toggleRemoval(item.id)}
                                                                    className={`
                                                                        flex items-center gap-2 p-2 rounded cursor-pointer transition-all border
                                                                        ${isRemoved
                                                                            ? "bg-red-500 text-white border-red-500 shadow-md"
                                                                            : "bg-white/5 border-transparent hover:bg-white/10 opacity-70 hover:opacity-100"
                                                                        }
                                                                    `}
                                                                >
                                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isRemoved ? "border-white bg-white/20" : "border-gray-500"}`}>
                                                                        {isRemoved && <XMarkIcon className="w-3 h-3 text-white" />}
                                                                    </div>
                                                                    <span className="text-sm font-bold">{item.name}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* 2. Sauces (Soslar) */}
                                            <div>
                                                <h3 className="font-bold uppercase text-xs tracking-widest mb-3 opacity-60">Soslar</h3>
                                                <div className="space-y-2">
                                                    {SAUCES.map((sauce) => {
                                                        const isSelected = selectedSauces.includes(sauce.id);
                                                        return (
                                                            <div
                                                                key={sauce.id}
                                                                onClick={() => toggleSauce(sauce.id)}
                                                                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border transition-all ${isSelected
                                                                        ? "border-[#FF4E42] bg-[#FF4E42]/5"
                                                                        : "border-transparent bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`h-5 w-5 rounded flex items-center justify-center border ${isSelected ? "bg-[#FF4E42] border-[#FF4E42]" : "border-gray-400"}`}>
                                                                        {isSelected && <span className="text-white text-xs">✓</span>}
                                                                    </div>
                                                                    <span className="font-bold text-sm">{sauce.name}</span>
                                                                </div>
                                                                <span className="text-xs font-mono opacity-60">+{sauce.price} ₺</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* 3. Extras (Ekstra Lezzetler) */}
                                            <div>
                                                <h3 className="font-bold uppercase text-xs tracking-widest mb-3 opacity-60">Ekstralar</h3>
                                                <div className="space-y-2">
                                                    {EXTRAS.map((extra) => {
                                                        const isSelected = selectedExtras.includes(extra.id);
                                                        return (
                                                            <div
                                                                key={extra.id}
                                                                onClick={() => toggleExtra(extra.id)}
                                                                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border transition-all ${isSelected
                                                                        ? "border-[#FFB800] bg-[#FFB800]/10"
                                                                        : "border-transparent bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`h-5 w-5 rounded flex items-center justify-center border ${isSelected ? "bg-[#FFB800] border-[#FFB800]" : "border-gray-400"}`}>
                                                                        {isSelected && <span className="text-black text-xs font-bold">✓</span>}
                                                                    </div>
                                                                    <span className="font-bold text-sm">{extra.name}</span>
                                                                </div>
                                                                <span className="text-xs font-mono opacity-60">+{extra.price} ₺</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                        </div>

                                        {/* Footer / Actions */}
                                        <div className="border-t border-gray-100 dark:border-white/10 px-6 py-6 bg-gray-50 dark:bg-black/20 sticky bottom-0 z-20 backdrop-blur-md">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-4 border border-gray-300 dark:border-white/20 rounded-full px-4 py-2 bg-white dark:bg-black">
                                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-[#FF4E42]">
                                                        <MinusIcon className="h-5 w-5" />
                                                    </button>
                                                    <span className="font-mono font-bold w-6 text-center text-lg">{quantity}</span>
                                                    <button onClick={() => setQuantity(quantity + 1)} className="hover:text-[#FF4E42]">
                                                        <PlusIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-xs opacity-60">TOPLAM</span>
                                                    <span className="block text-3xl font-mono font-black text-[#FF4E42]">{finalPrice} ₺</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleAddToOrder}
                                                className="w-full rounded-xl bg-[#FF4E42] py-4 font-montserrat text-lg font-black uppercase tracking-widest text-white shadow-xl shadow-[#FF4E42]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                SEPETE EKLE
                                            </button>
                                        </div>

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
