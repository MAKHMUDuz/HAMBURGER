import { validateCoupon } from "@/lib/campaign-db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { code, cartTotal } = await request.json();

        if (!code) {
            return NextResponse.json({ isValid: false, message: "Kupon kodu gerekli." }, { status: 400 });
        }

        const result = await validateCoupon(code, cartTotal || 0);

        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ isValid: false, message: "Sunucu hatası." }, { status: 500 });
    }
}
