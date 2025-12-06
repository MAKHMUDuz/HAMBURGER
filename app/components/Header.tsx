"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cart-context";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const { items, toggleDrawer } = useCart();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md transition-all">
            <div className="container-custom flex h-20 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-xl font-black text-white shadow-[0_0_10px_var(--primary)] transition-transform group-hover:scale-110">
                        F5
                    </div>
                    <span className="font-montserrat text-2xl font-black tracking-tighter text-foreground">
                        BURGER <span className="text-primary hidden sm:inline">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {[
                        { name: "Menü", href: "/#menu" },
                        { name: "Hikayemiz", href: "/" },
                        { name: "Sipariş Takip", href: "/track" }, // Added Link to Track
                        { name: "İletişim", href: "/" }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-accent-gold hover:drop-shadow-[0_0_5px_var(--accent-gold)]"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <ThemeToggle />

                    <button
                        onClick={toggleDrawer}
                        className="relative group p-2 text-foreground hover:text-primary transition-colors"
                    >
                        <ShoppingBagIcon className="h-7 w-7 transition-all group-hover:drop-shadow-[0_0_8px_var(--primary)]" />

                        {items.length > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                                {items.length}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} // Simple scroll to menu
                        className="hidden sm:inline-flex items-center justify-center bg-primary px-8 py-3 font-montserrat text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_var(--primary)]"
                        style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
                    >
                        Sipariş Ver
                    </button>
                </div>
            </div>
        </header>
    );
}
