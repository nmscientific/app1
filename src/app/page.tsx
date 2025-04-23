"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Plus, Settings } from 'lucide-react';
import Link from "next/link";
import { default_api } from '../api';
import { useEffect, useState } from 'react';
import { Quote } from '@/types';

export default function Home() {
  const [quoteFiles, setQuoteFiles] = useState<string[]>([]);

    useEffect(() => {
        const fetchQuoteFiles = async () => {
            try {
                const files = await default_api.list_files();
                setQuoteFiles(files.filter((file) => file.startsWith('quote-')));
            } catch (error) {
                console.error('Failed to fetch quote files:', error);
                setQuoteFiles([]);
            }
        };

        fetchQuoteFiles();
    }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">Home</h1>
        <p className="text-lg text-center text-muted-foreground">Your professional glass quoting solution</p>
      </header>

      <main className="flex flex-wrap items-start justify-center max-w-5xl mt-3">
        <Card className="w-full md:w-96 m-4">
          <CardHeader>
            <CardTitle>
              <Plus className="mr-2 inline-block h-5 w-5" /> Create New Quote
            </CardTitle>
            <CardDescription>Start a new quote from scratch.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/quotes/new" className="w-full">
              <Button className="w-full" variant="accent">
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full md:w-96 m-4">
          <CardHeader>
            <CardTitle>
              <Settings className="mr-2 inline-block h-5 w-5" /> Configure
              Product List
            </CardTitle>
            <CardDescription>Manage product descriptions and pricing.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/products" className="w-full">
              <Button className="w-full" variant="accent">Configure Products</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <main className="flex flex-wrap items-start justify-center max-w-5xl mt-3">
            <Card className="w-full md:w-96 m-4">
                <CardHeader>
                    <CardTitle>Open Existing Quote</CardTitle>
                    <CardDescription>Open and manage previously saved quotes.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <ul>
                        {quoteFiles.length > 0 ? quoteFiles.map((file) => (
                            <li key={file}>
                                <Link href={`/quotes/${file.replace('.json', '')}`}>{file}</Link>
                            </li>
                        )) : <li>No saved quotes yet.</li>}
                    </ul>
                    <Link href="/quotes" className="w-full">
                        <Button className="w-full" variant="accent">
                            Manage quotes
                        </Button>
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
