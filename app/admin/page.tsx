"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                const data = await res.json();
                setError(data.message || "Giriş başarısız");
            }
        } catch {
            setError("Bağlantı hatası");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-gray-900 p-8 shadow-2xl border border-gray-800">
                <div className="mb-6 flex justify-center text-primary">
                    <div className="rounded-full bg-primary/10 p-4">
                        <LockClosedIcon className="h-8 w-8 text-primary" />
                    </div>
                </div>

                <h1 className="mb-2 text-center text-2xl font-bold text-white font-montserrat">Yönetici Girişi</h1>
                <p className="mb-8 text-center text-sm text-gray-500">Devam etmek için giriş yapın.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-400">Kullanıcı Adı</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg bg-gray-800 border-gray-700 px-4 py-2 text-white focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-400">Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg bg-gray-800 border-gray-700 px-4 py-2 text-white focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

                    {error && <p className="text-center text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-primary py-2.5 font-bold text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>
            </div>
        </div>
    );
}
