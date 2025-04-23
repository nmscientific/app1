
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Plus, FolderOpen, Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">GlassQuote Pro</h1>
        <p className="text-lg text-center text-muted-foreground">Your professional glass quoting solution</p>
      </header>

      <main className="flex flex-wrap items-start justify-center max-w-5xl mt-3">
        <Card className="w-full md:w-96 m-4">
          <CardHeader>
            <CardTitle><Plus className="mr-2 inline-block h-5 w-5" /> Create New Quote</CardTitle>
            <CardDescription>Start a new quote from scratch.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/quotes/new" className="w-full">
              <Button className="w-full" variant="accent">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full md:w-96 m-4">
          <CardHeader>
            <CardTitle><FolderOpen className="mr-2 inline-block h-5 w-5" /> Open Existing Quote</CardTitle>
            <CardDescription>Open and manage previously saved quotes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/quotes" className="w-full">
              <Button className="w-full" variant="accent">Open Quotes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full md:w-96 m-4">
          <CardHeader>
            <CardTitle><Settings className="mr-2 inline-block h-5 w-5" /> Configure Product List</CardTitle>
            <CardDescription>Manage product descriptions and pricing.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/products" className="w-full">
              <Button className="w-full" variant="accent">Configure Products</Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-8 text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} GlassQuote Pro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
