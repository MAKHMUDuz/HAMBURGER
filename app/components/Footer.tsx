"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa"; // Assuming react-icons is installed or we use heroicons replacements

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-surface pb-10 pt-16 transition-colors duration-300">
            <div className="container-custom grid gap-12 md:grid-cols-4">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="mb-6 inline-block">
                        <span className="font-montserrat text-3xl font-black tracking-tighter text-foreground">
                            F5 BURGER <span className="text-primary">.</span>
                        </span>
                    </Link>
                    <p className="max-w-md text-gray-500">
                        Geleceğin lezzeti bugün burada. Tazeliği F5'le yeniledik, premium burger deneyimini evine getirdik.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="mb-6 font-montserrat text-sm font-bold uppercase tracking-widest text-foreground">
                        Hızlı Linkler
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li><Link href="/menu" className="hover:text-primary transition-colors">Menü</Link></li>
                        <li><Link href="/track" className="hover:text-primary transition-colors">Sipariş Takip</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">İletişim</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="mb-6 font-montserrat text-sm font-bold uppercase tracking-widest text-foreground">
                        Takip Et
                    </h4>
                    <div className="flex gap-4">
                        {/* Mock Social Icons */}
                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">IG</div>
                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">TW</div>
                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">FB</div>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-16 border-t border-white/10 pt-8 text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} F5 BURGER. Tüm Hakları Saklıdır.
            </div>
        </footer>
    );
}
