import fs from 'fs/promises';
import path from 'path';
import { Order, OrderStatus } from './definitions';

const ORDER_FILE = path.join(process.cwd(), 'data', 'orders.json');

export async function getOrders(): Promise<Order[]> {
    try {
        const data = await fs.readFile(ORDER_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function saveOrders(orders: Order[]): Promise<boolean> {
    try {
        await fs.writeFile(ORDER_FILE, JSON.stringify(orders, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error("Error saving orders:", error);
        return false;
    }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    const orders = await getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex === -1) return false;

    orders[orderIndex].status = status;
    return saveOrders(orders);
}
