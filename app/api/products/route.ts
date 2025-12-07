import { checkAdminAccess } from "@/lib/auth";
import { getProducts, saveProducts } from "@/lib/product-db";
import { NextResponse } from "next/server";

export async function GET() {
    // GET is public for the menu
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function PUT(request: Request) {
    // Check auth via helper
    const auth = await checkAdminAccess();
    if (!auth.authorized) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        // Body should be the full array of products or a single update logic (simplified: replace full array for now)
        const success = await saveProducts(body);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: "Write Failed" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
