import { NextResponse } from "next/server";

// Mock Data for GET
const MOCK_ORDERS = [
    {
        id: "mock-1",
        orderNumber: "F5-20251206-1234",
        customerName: "Ahmet Yılmaz",
        total: 450,
        status: "preparing",
        createdAt: new Date().toISOString(),
        paymentMethod: "online",
        items: [
            { id: "1", productName: "F5 İmza Burger", quantity: 1, price: 380, extras: "Patates", totalPrice: 380 },
            { id: "2", productName: "Cola Zero", quantity: 2, price: 35, extras: "", totalPrice: 70 }
        ]
    }
];

export async function GET() {
    return NextResponse.json({ success: true, data: MOCK_ORDERS });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, fullAddress, note, items, total, paymentMethod } = body;

        const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const orderNumber = `F5-${date}-${randomSuffix}`;

        console.log(">> MOCK ORDER CREATED:", orderNumber, body);

        // Simulate success
        return NextResponse.json({
            success: true,
            orderId: orderNumber,
            message: "Sipariş alındı (Mock)",
            items: items,
            total: total
        });

    } catch (error) {
        console.error("Order API Error:", error);
        return NextResponse.json(
            { success: false, message: "Sunucu Hatası" },
            { status: 500 }
        );
    }
}
