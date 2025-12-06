import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/product-db";
import { cookies } from "next/headers";

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function PUT(request: Request) {
    // Check auth
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_session")?.value === "true";

    if (!isAdmin) {
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
