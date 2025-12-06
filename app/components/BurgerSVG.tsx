export default function BurgerSVG({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Bun Top */}
            <g id="bun-top">
                <path
                    d="M100 200 C100 120, 400 120, 400 200 Z"
                    fill="#F59E0B"
                    stroke="#78350F"
                    strokeWidth="4"
                />
                {/* Seeds */}
                <circle cx="150" cy="160" r="3" fill="#FEF3C7" />
                <circle cx="200" cy="150" r="3" fill="#FEF3C7" />
                <circle cx="250" cy="170" r="3" fill="#FEF3C7" />
                <circle cx="300" cy="155" r="3" fill="#FEF3C7" />
                <circle cx="350" cy="165" r="3" fill="#FEF3C7" />
            </g>

            {/* Lettuce */}
            <g id="lettuce">
                <path
                    d="M90 220 Q110 210, 130 220 T170 220 T210 220 T250 220 T290 220 T330 220 T370 220 T410 220 L400 240 L100 240 Z"
                    fill="#22C55E"
                    stroke="#14532D"
                    strokeWidth="3"
                />
            </g>

            {/* Cheese */}
            <g id="cheese">
                <path
                    d="M95 250 L405 250 L405 260 L350 280 L300 260 L200 280 L100 260 L95 250 Z"
                    fill="#FCD34D"
                    stroke="#B45309"
                    strokeWidth="3"
                />
            </g>

            {/* Patty */}
            <g id="patty">
                <rect
                    x="100"
                    y="280"
                    width="300"
                    height="50"
                    rx="10"
                    fill="#78350F"
                    stroke="#451A03"
                    strokeWidth="4"
                />
            </g>

            {/* Bun Bottom */}
            <g id="bun-bottom">
                <path
                    d="M100 340 L400 340 C400 380, 100 380, 100 340 Z"
                    fill="#F59E0B"
                    stroke="#78350F"
                    strokeWidth="4"
                />
            </g>
        </svg>
    );
}
