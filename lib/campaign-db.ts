import fs from 'fs/promises';
import path from 'path';
import { Campaign } from './definitions';

const CAMPAIGN_FILE = path.join(process.cwd(), 'data', 'campaigns.json');

export async function getCampaigns(): Promise<Campaign[]> {
    try {
        const data = await fs.readFile(CAMPAIGN_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function saveCampaigns(campaigns: Campaign[]): Promise<boolean> {
    try {
        await fs.mkdir(path.dirname(CAMPAIGN_FILE), { recursive: true });
        await fs.writeFile(CAMPAIGN_FILE, JSON.stringify(campaigns, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error("Error saving campaigns:", error);
        return false;
    }
}

export async function validateCoupon(code: string, cartTotal: number): Promise<{ isValid: boolean; message?: string; campaign?: Campaign; discountAmount?: number }> {
    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);

    if (!campaign) {
        return { isValid: false, message: "Kupon bulunamadı." };
    }

    // Date Checks
    const now = new Date();
    if (campaign.startDate && new Date(campaign.startDate) > now) {
        return { isValid: false, message: "Kupon henüz başlamadı." };
    }
    if (campaign.endDate && new Date(campaign.endDate) < now) {
        return { isValid: false, message: "Kupon süresi dolmuş." };
    }

    // Limit Checks
    if (campaign.usageLimit && campaign.usedCount >= campaign.usageLimit) {
        return { isValid: false, message: "Kupon kullanım limiti dolmuş." };
    }

    // Minimum Cart Amount
    if (campaign.minCartAmount && cartTotal < campaign.minCartAmount) {
        return { isValid: false, message: `Bu kupon için minimum sepet tutarı ${campaign.minCartAmount} ₺ olmalıdır.` };
    }

    // Calculate Discount
    let discountAmount = 0;
    if (campaign.type === 'percent') {
        discountAmount = (cartTotal * campaign.value) / 100;
    } else {
        discountAmount = campaign.value;
    }

    // Ensure discount isn't more than total
    if (discountAmount > cartTotal) {
        discountAmount = cartTotal;
    }

    return { isValid: true, campaign, discountAmount };
}
