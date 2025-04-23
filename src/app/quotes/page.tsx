
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuotesPage() {
  // Placeholder for fetching and displaying existing quotes
  const quotes = [
    { id: "1", name: "Quote 1", date: "2024-01-01" },
    { id: "2", name: "Quote 2", date: "2024-01-05" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Existing Quotes</h1>
      {quotes.map((quote) => (
        <Card key={quote.id} className="mb-4">
          <CardHeader>
            <CardTitle>{quote.name}</CardTitle>
            <CardDescription>Date: {quote.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Link href={`/quotes/${quote.id}`}><Button variant="outline">View</Button></Link>
              <Link href={`/quotes/edit/${quote.id}`}><Button variant="secondary">Edit</Button></Link>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

