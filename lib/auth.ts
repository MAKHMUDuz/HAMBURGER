import { cookies } from "next/headers";

export interface AuthResult {
    authorized: boolean;
    reason?: "NOT_AUTHENTICATED" | "NOT_ADMIN";
    user?: { role: string };
}

export async function checkAdminAccess(): Promise<AuthResult> {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "true") {
        return { authorized: false, reason: "NOT_AUTHENTICATED" };
    }

    // In a real app with JWT/Database, you would verify the token and role here.
    // For now, existence of the secure cookie "admin_session" implies Admin role.
    return { authorized: true, user: { role: "admin" } };
}
