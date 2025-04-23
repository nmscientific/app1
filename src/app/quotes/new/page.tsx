
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock product data (replace with actual data fetching)
const products = [
  { id: "1", name: "Standard Glass", description: "Regular glass", pricePerSqFt: 2.50 },
  { id: "2", name: "Tempered Glass", description: "Stronger glass", pricePerSqFt: 4.00 },
  { id: "3", name: "Laminated Glass", description: "Safety glass", pricePerSqFt: 5.50 },
];

export default function NewQuotePage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [quoteItems, setQuoteItems] = useState<any[]>([]);
  const [manualItemDescription, setManualItemDescription] = useState("");
  const [manualItemPrice, setManualItemPrice] = useState<number | null>(null);
  const { toast } = useToast();

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  const calculateArea = () => {
    if (width && height) {
      return width * height;
    }
    return 0;
  };

  const addProductToQuote = () => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Please select a product.",
        variant: "destructive",
      });
      return;
    }

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) {
      toast({
        title: "Error",
        description: "Selected product not found.",
        variant: "destructive",
      });
      return;
    }

    const area = calculateArea();
    const price = area * product.pricePerSqFt;

    setQuoteItems([
      ...quoteItems,
      {
        id: Date.now(),
        description: `${product.name} - ${product.description} (${width}x${height})`,
        price: price.toFixed(2),
      },
    ]);

    // Clear input fields
    setSelectedProduct(null);
    setWidth(null);
    setHeight(null);
  };

  const addManualItemToQuote = () => {
    if (!manualItemDescription || !manualItemPrice) {
      toast({
        title: "Error",
        description: "Please enter description and price for manual item.",
        variant: "destructive",
      });
      return;
    }

    setQuoteItems([
      ...quoteItems,
      {
        id: Date.now(),
        description: manualItemDescription,
        price: manualItemPrice.toFixed(2),
      },
    ]);

    // Clear input fields
    setManualItemDescription("");
    setManualItemPrice(null);
  };

  const calculateTotal = () => {
    return quoteItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  const handleSaveQuote = () => {
    // TODO: Implement actual save functionality
    toast({
      title: "Quote Saved",
      description: "Your quote has been saved successfully.",
    });
  };

  const handlePrintQuote = () => {
    // TODO: Implement print functionality
    toast({
      title: "Print Quote",
      description: "Opens a print preview.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Quote</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Product Selection</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Select onValueChange={handleProductSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedProduct && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (ft)</Label>
                <Input
                  type="number"
                  id="width"
                  value={width || ""}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (ft)</Label>
                <Input
                  type="number"
                  id="height"
                  value={height || ""}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                />
              </div>
              <Button variant="secondary" onClick={addProductToQuote}>Add Product</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Manual Quote Item</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={manualItemDescription}
              onChange={(e) => setManualItemDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              value={manualItemPrice || ""}
              onChange={(e) => setManualItemPrice(parseFloat(e.target.value))}
            />
          </div>
          <Button variant="secondary" onClick={addManualItemToQuote}>Add Manual Item</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Quote Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {quoteItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.description} - ${item.price}
              </li>
            ))}
          </ul>
          <div className="text-xl font-bold">Total: ${calculateTotal()}</div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="primary" onClick={handleSaveQuote}>Finalize and Save Quote</Button>
        <Button onClick={handlePrintQuote}>Print</Button>
      </div>
    </div>
  );
}
