import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: "burgers" | "chicken" | "sides" | "drinks" | "desserts";
    image: string;
}

export async function getProducts(): Promise<Product[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products:", error);
        return [];
    }
}

export async function saveProducts(products: Product[]): Promise<boolean> {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error("Error saving products:", error);
        return false;
    }
}
