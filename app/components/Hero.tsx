"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BurgerSVG from "./BurgerSVG";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const burgerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                },
            });

            // 6-Layer Separation + Scale Up
            // Layers: bun-top, lettuce, cheese, patty, tomato (mock if missing), bun-bottom
            tl.to("#bun-top", { y: -250, rotation: -5, ease: "power1.out" }, 0)
                .to("#lettuce", { y: -160, rotation: 5, ease: "power1.out" }, 0)
                .to("#cheese", { y: -80, rotation: -3, ease: "power1.out" }, 0)
                .to("#patty", { y: 20, rotation: 2, ease: "power1.out" }, 0)
                // Assuming SVGs might not have tomato/bun-bottom separate, adjusting existing
                .to("#bun-bottom", { y: 180, rotation: 5, ease: "power1.out" }, 0)

                // Scale Up Effect (Zoom)
                .to(burgerRef.current, { scale: 1.4, ease: "power1.inOut" }, 0)

                // Text Fade Out
                .to(textRef.current, { opacity: 0, y: -50, scale: 0.95 }, 0);
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-background transition-colors duration-300"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent-gold/5 blur-[120px]" />
            </div>

            <div className="container-custom relative z-10 grid h-full grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Text Content */}
                <div ref={textRef} className="flex flex-col items-start gap-6 text-left">
                    <div className="inline-flex items-center gap-2 rounded border border-accent-gold/30 bg-accent-gold/5 px-4 py-2 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">Premium Experience</span>
                    </div>

                    <h1 className="font-montserrat text-5xl font-black leading-[0.9] tracking-tighter text-foreground md:text-7xl lg:text-8xl">
                        TAZELİĞİ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">F5'LE</span> <br />
                        YENİLE
                    </h1>

                    <p className="max-w-md font-mono text-lg text-gray-500 dark:text-gray-400">
                        Scroll et <ArrowDownIcon className="inline h-4 w-4" /> Burgeri parçala <br />
                        Siparişini oluştur.
                    </p>

                    <div className="flex gap-6 mt-4">
                        <Link
                            href="/menu"
                            className="group relative flex items-center justify-center bg-primary px-10 py-4 font-montserrat text-base font-bold uppercase tracking-widest text-white transition-all hover:bg-red-600 hover:shadow-[0_0_30px_var(--primary)]"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
                        >
                            Sipariş Ver
                        </Link>
                    </div>
                </div>

                {/* Visual Content */}
                <div ref={burgerRef} className="relative flex h-full items-center justify-center pointer-events-none">
                    <div className="w-full max-w-[550px] relative">
                        {/* Glow behind burger */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent-gold/20 blur-[60px] rounded-full animate-pulse" />
                        <BurgerSVG className="relative z-10 w-full h-auto drop-shadow-2xl" />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 animate-bounce flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600">
                <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Explore</span>
                <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent"></div>
            </div>
        </section>
    );
}
