
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: "burgers" | "chicken" | "sides" | "drinks" | "desserts";
    image: string;
}

export const menuProducts: Product[] = [
    // Burgers
    {
        id: "f5-signature",
        name: "F5 İmza Burger",
        description: "Siyah trüf mayonez, 180g dana köfte, eski kaşar, karamelize soğan, roka.",
        price: 380,
        category: "burgers",
        image: "/images/products/burger-signature.png"
    },
    {
        id: "cyber-cheese",
        name: "Cyber Cheeseburger",
        description: "Çift cheddar, 2x dana köfte, turşu, F5 özel sos.",
        price: 320,
        category: "burgers",
        image: "/images/products/burger-cheese.png"
    },
    {
        id: "neon-spicy",
        name: "Neon Acılı Burger",
        description: "Meksika biberi, acı sos, cheddar, kıtır soğan.",
        price: 310,
        category: "burgers",
        image: "/images/products/burger-spicy.png"
    },
    {
        id: "tech-mushroom",
        name: "Tech Mantarlı",
        description: "Sote mantar, İsviçre peyniri, trüf yağlı mayonez.",
        price: 340,
        category: "burgers",
        image: "/images/products/burger-mushroom.png"
    },

    // Chicken
    {
        id: "laser-chicken",
        name: "Lazer Tavuk Burger",
        description: "Çıtır tavuk göğsü, coleslaw salata, ballı hardal.",
        price: 250,
        category: "chicken",
        image: "/images/products/chicken-crispy.png"
    },

    // Sides
    {
        id: "data-fries",
        name: "Data Patates",
        description: "Baharatlı çıtır patates kızartması.",
        price: 90,
        category: "sides",
        image: "/images/products/fries.png"
    },
    {
        id: "onion-rings",
        name: "Halka Soğanlar",
        description: "8 adet çıtır soğan halkası, ranch sos ile.",
        price: 110,
        category: "sides",
        image: "/images/products/onion-rings.png"
    },

    // Drinks
    {
        id: "cola",
        name: "Cola Zero",
        description: "330ml Kutu",
        price: 50,
        category: "drinks",
        image: "/images/products/cola-zero.png"
    },
    {
        id: "shake",
        name: "Çilekli Shake",
        description: "Gerçek dondurma ve çilek parçalarıyla.",
        price: 120,
        category: "drinks",
        image: "/images/products/shake-strawberry.png"
    }
];
