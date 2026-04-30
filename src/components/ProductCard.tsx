"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import WishlistButton from "@/components/WishlistButton";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  isCustomizable: boolean;
  variants?: any[]; // Allow variants to be passed for fallback logic
  reviews?: { rating: number }[]; // Array of reviews to calculate average
  index?: number; // Added for staggered animations
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  images,
  category,
  isCustomizable,
  variants,
  reviews,
  index = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.15 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={images[0] || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          {isCustomizable && (
            <Badge className="absolute left-2 top-2 z-10 bg-white/80 text-black backdrop-blur-sm border-none shadow-sm" variant="secondary">
              Customizable
            </Badge>
          )}
          <div className="absolute right-2 top-2 z-10" onClick={(e) => e.preventDefault()}>
            <WishlistButton productId={id} />
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2">
          {category}
        </Badge>
        <h3 className="font-semibold line-clamp-2 min-h-[3rem]">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Rating Display */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">
            {reviews && reviews.length > 0
              ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
              : "New"
            }
          </span>
          {reviews && reviews.length > 0 && (
            <span className="text-xs text-muted-foreground">({reviews.length})</span>
          )}
        </div>

        <p className="mt-2 text-lg font-bold">₹{(price > 0 ? price : (variants?.[0]?.price || 0)).toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
    </motion.div>
  );
}
