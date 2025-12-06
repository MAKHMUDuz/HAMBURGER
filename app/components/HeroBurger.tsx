"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBurger() {
    const containerRef = useRef(null);
    const burgerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline tied to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // Start animation when section is at top
                    end: "bottom center", // End when scrolled halfway down
                    scrub: 1, // Smoothly link animation to scrollbar
                },
            });

            // 1. Text moves up and fades slightly (Parallax)
            tl.to(textRef.current, { y: -150, opacity: 0.8 }, 0);

            // 2. Burger REVEAL Animation (As requested: Scroll -> Appear & Move Up)
            // Starts from CSS/Initial state: opacity 0, scale 0.7 (set below in JSX/CSS)
            tl.fromTo(
                burgerRef.current,
                {
                    opacity: 0,
                    scale: 0.7,
                    y: 200 // Start from below
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: -50, // Ends up slightly raised
                    ease: "power2.out",
                    duration: 1
                },
                0
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[150vh] flex flex-col items-center justify-start pt-40 bg-background overflow-hidden"
        >
            {/* 1) Fixed/Sticky Text - "LEZZETİN TA KENDİSİ" */}
            <div
                ref={textRef}
                className="relative z-20 text-center mix-blend-difference"
            >
                <h1 className="font-montserrat text-6xl md:text-9xl font-black text-white dark:text-foreground tracking-tighter leading-none drop-shadow-2xl">
                    LEZZETİN
                    <br />
                    <span className="text-primary block mt-2">TA KENDİSİ</span>
                </h1>

                <div className="mt-8 flex flex-col items-center gap-2 text-gray-500 font-mono text-sm animate-bounce">
                    <span>KAYDIR</span>
                    <ArrowDownIcon className="h-5 w-5" />
                </div>
            </div>

            {/* 2) Background Burger Logic - Reveals on Scroll */}
            <div className="sticky top-[20vh] w-full max-w-[800px] h-[600px] flex items-center justify-center z-10 pointer-events-none">
                <div ref={burgerRef} className="relative w-full h-full opacity-0 scale-75">
                    <Image
                        src="/images/hero-burger.png"
                        alt="F5 Burger Real"
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                        className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    />
                </div>
            </div>

        </section>
    );
}
