import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    // Hardcoded credentials for now (as requested by user)
    // Username: "mahmut", Password: "hamburger"
    if (username === "mahmut" && password === "hamburger") {
        const cookieStore = await cookies();

        // Set secure cookie
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 day
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
    );
}
