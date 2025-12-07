import { checkAdminAccess } from "@/lib/auth";
import { getCampaigns, saveCampaigns } from "@/lib/campaign-db";
import { Campaign } from "@/lib/definitions";
import { NextResponse } from "next/server";

export async function GET() {
    const auth = await checkAdminAccess();
    if (!auth.authorized) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const campaigns = await getCampaigns();
    return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
    const auth = await checkAdminAccess();
    if (!auth.authorized) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const campaigns = await getCampaigns();

        // Check if updating or creating
        // Simplified Logic: If body is array, replace all (Batch Update). If single object, Add/Edit.
        // For this implementation, we'll assume the client sends the *updated single campaign* or *new campaign*

        let updatedCampaigns = [...campaigns];

        // We expect the client to send a SINGLE campaign object to add/update
        const newCampaign = body as Campaign;

        const index = updatedCampaigns.findIndex(c => c.id === newCampaign.id);

        if (index > -1) {
            // Update
            updatedCampaigns[index] = newCampaign;
        } else {
            // Create
            // Auto generate ID if missing
            if (!newCampaign.id) {
                newCampaign.id = Math.random().toString(36).substr(2, 9);
            }
            newCampaign.usedCount = 0; // Reset used count on create
            updatedCampaigns.push(newCampaign);
        }

        await saveCampaigns(updatedCampaigns);
        return NextResponse.json({ success: true, campaign: newCampaign });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Error saving campaign" }, { status: 500 });
    }
}
