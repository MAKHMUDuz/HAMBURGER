"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            setError("Hatalı kullanıcı adı veya şifre!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 font-inter relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

            <div className="w-full max-w-md p-8 rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 rounded-2xl bg-gray-800/50 mb-4 text-primary">
                        <LockClosedIcon className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-black font-montserrat text-white tracking-tight">
                        F5<span className="text-primary">PANEL</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Yönetici girişi yapın</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
                    >
                        Giriş Yap
                    </button>
                </form>

                <p className="text-center mt-6 text-xs text-gray-600">
                    &copy; 2025 F5 Burger. Bu alan yetkili personel içindir.
                </p>
            </div>
        </div>
    );
}
