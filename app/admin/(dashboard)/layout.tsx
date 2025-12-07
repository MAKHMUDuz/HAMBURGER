import Link from "next/link";
import {
    Squares2X2Icon,
    ClipboardDocumentListIcon,
    UsersIcon,
    TagIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { checkAdminAccess } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const auth = await checkAdminAccess();
    if (!auth.authorized) {
        redirect('/admin/login');
    }

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: Squares2X2Icon },
        { name: "Siparişler", href: "/admin/orders", icon: ClipboardDocumentListIcon },
        { name: "Menü Yönetimi", href: "/admin/menu", icon: TagIcon },
        { name: "Kullanıcılar", href: "/admin/users", icon: UsersIcon },
        { name: "Kampanyalar", href: "/admin/campaigns", icon: ChartBarIcon },
        { name: "Ayarlar", href: "/admin/settings", icon: Cog6ToothIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white font-inter flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-gray-900/50 backdrop-blur-xl hidden md:flex flex-col fixed h-full z-50">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-black font-montserrat tracking-tighter text-primary">
                        F5<span className="text-white">PANEL</span>
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Admin v2.0</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <item.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                            <span className="font-medium group-hover:translate-x-1 transition-transform">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                    >
                        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                        <span className="font-bold">Çıkış Yap</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 relative">
                {/* Background Gradients */}
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-gray-950 to-gray-950 pointer-events-none -z-10" />

                {children}
            </main>
        </div>
    );
}
