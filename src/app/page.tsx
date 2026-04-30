import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      variants: true,
      reviews: {
        select: {
          rating: true
        }
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <Features />

      <section className="py-20 container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Featured Collection
            </h2>
            <p className="mt-2 text-muted-foreground text-lg">
              Our most popular picks this season.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/products" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product: any, index: number) => (
            <ProductCard
              key={product.id}
              index={index}
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
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20 text-center text-foreground border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Ready to Create Something Special?
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground text-lg">
            Join thousands of happy customers who have found the perfect personalized gift.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
