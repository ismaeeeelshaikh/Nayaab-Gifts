"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    isCustomizable: boolean;
    variants: any[];
    reviews: { rating: number }[];
    createdAt: string;
}

interface SimilarProductsProps {
    currentProductId: string;
    currentProductName: string;
    category: string;
}

export default function SimilarProducts({ currentProductId, currentProductName, category }: SimilarProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Fetch same-category products with a small limit (server-side filtering)
                const res = await fetch(`/api/products?category=${encodeURIComponent(category)}&limit=10`);
                if (!res.ok) throw new Error("Failed to fetch");

                const data: Product[] = await res.json();

                // Calculate similarity score
                const calculateSimilarity = (prodName: string, targetName: string) => {
                    const targetWords = targetName.toLowerCase().split(/\s+/).filter(w => w.length > 2);
                    const prodWords = prodName.toLowerCase().split(/\s+/).filter(w => w.length > 2);
                    const intersection = targetWords.filter(word => prodWords.includes(word));
                    return intersection.length;
                };

                const processedProducts = data
                    .filter((p) => p.id !== currentProductId) // Remove current product
                    .map(p => ({
                        ...p,
                        similarityScore: calculateSimilarity(p.name, currentProductName)
                    }))
                    .sort((a, b) => {
                        // Sort by similarity score (descending)
                        if (b.similarityScore !== a.similarityScore) {
                            return b.similarityScore - a.similarityScore;
                        }
                        // Then by creation date (newest first)
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    })
                    .slice(0, 5); // Take top 5

                setProducts(processedProducts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (category) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [category, currentProductId, currentProductName]);

    if (loading) return null;

    if (products.length === 0) return null;

    return (
        <section className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold">You might also love</h2>

            <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex w-max space-x-4 pb-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-[280px]">
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                images={product.images && product.images.length > 0 ? product.images : (product.variants?.[0]?.images || [])}
                                category={product.category}
                                isCustomizable={product.isCustomizable}
                                variants={product.variants}
                                reviews={product.reviews}
                            />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
}
