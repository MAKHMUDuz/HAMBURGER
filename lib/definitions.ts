
// Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: "burgers" | "chicken" | "sides" | "drinks" | "desserts";
    image: string;
    stock?: number;
    discountPrice?: number;
    isAvailable?: boolean;
    variants?: Variant[];
    extraGroups?: string[]; // IDs of compatible ExtraGroups
}

export interface Variant {
    name: string;
    price: number;
}

export interface ExtraItem {
    name: string;
    price: number;
}

export interface ExtraGroup {
    id: string;
    name: string;
    items: ExtraItem[];
    minSelect: number; // 0 for optional
    maxSelect: number;
}

// Order Types
export type OrderStatus = 'pending' | 'preparing' | 'on-way' | 'delivered' | 'cancelled';

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    extras?: string[]; // strings like "Extra Cheese"
    variant?: string; // e.g., "180g"
}

export interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    address: string;
    note?: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string; // ISO String
    paymentMethod: 'cash' | 'card' | 'online';
}

export interface Campaign {
    id: string;
    code: string; // e.g., "YAZ2025"
    type: 'percent' | 'fixed';
    value: number; // e.g., 20
    minCartAmount?: number;
    startDate?: string;
    endDate?: string;
    usageLimit?: number;
    usedCount: number;
    isActive: boolean;
}

// Constants
export const EXTRA_GROUPS: ExtraGroup[] = [
    {
        id: "ingredients",
        name: "Malzemeler",
        minSelect: 0,
        maxSelect: 5,
        items: [
            { name: "Cheddar Peyniri", price: 20 },
            { name: "Dana Bacon", price: 40 },
            { name: "Karamelize Soğan", price: 15 },
            { name: "Extra Köfte 90g", price: 90 },
            { name: "Jalapeno", price: 15 },
        ]
    },
    {
        id: "sauces",
        name: "Soslar",
        minSelect: 0,
        maxSelect: 3,
        items: [
            { name: "Trüflü Mayonez", price: 10 },
            { name: "Acı Sos", price: 5 },
            { name: "Barbekü Sos", price: 5 },
            { name: "Ranch Sos", price: 5 },
        ]
    }
];

export async function getExtraGroups(): Promise<ExtraGroup[]> {
    return EXTRA_GROUPS;
}
