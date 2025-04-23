'use server';

import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src/data/products.json');

async function readProductsFromFile(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    console.error("Error reading products from file:", error);
    return [];
  }
}

async function writeProductsToFile(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error: any) {
    console.error("Error writing products to file:", error);
    throw new Error(`Failed to write products to file: ${error.message}`);
  }
}

export async function saveProducts(products: Product[]): Promise<{ success: boolean; error?: string }> {
  try {
    await writeProductsToFile(products);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await readProductsFromFile();
    return products;
  } catch (error: any) {
    console.error("Error getting products:", error);
    return [];
  }
}
