"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const initialProducts = await response.json();
        setProducts(initialProducts);
      } catch (error: any) {
        console.error("Failed to load products:", error);
        toast({
          title: "Error",
          description: `Failed to load products: ${error.message}`,
          variant: "destructive",
        });
        setProducts([]);
      }
    };

    loadProducts();
  }, [toast]);

  const addProduct = async () => {
    if (!newProductName || !newProductPrice) {
      toast({
        title: "Error",
        description: "Please enter both product name and price.",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: newProductName,
      pricePerSqFt: newProductPrice,
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...products, newProduct]),
      });

      if (!response.ok) {
        throw new Error(`Failed to save products: ${response.status}`);
      }

      setProducts([...products, newProduct]);
      setNewProductName("");
      setNewProductPrice(null);

      toast({
        title: "Success",
        description: "Product added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to add product: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configure Products</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              type="text"
              id="productName"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="productPrice">Price per Sq Ft</Label>
            <Input
              type="number"
              id="productPrice"
              value={newProductPrice === null ? "" : newProductPrice.toString()}
              onChange={(e) =>
                setNewProductPrice(parseFloat(e.target.value))
              }
            />
          </div>
          <Button onClick={addProduct}>
             Add Product
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p>No products configured yet.</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id} className="py-2">
                  {product.name} - ${product.pricePerSqFt.toFixed(2)}/sq ft
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
