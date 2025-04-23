import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const products = await readProductsFromFile();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error getting products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const products: Product[] = await request.json();
    await writeProductsToFile(products);
    return NextResponse.json({ message: 'Products saved successfully' }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
