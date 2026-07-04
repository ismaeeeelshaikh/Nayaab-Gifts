"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/useCart";
import { useToast } from "@/components/ui/use-toast";
import Reviews from "@/components/Reviews";
import WishlistButton from "@/components/WishlistButton";
import SimilarProducts from "@/components/SimilarProducts";

interface ProductVariant {
  id: string;
  color: string;
  colorCode: string | null;
  price: number | null;
  stock: number;
  images: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  isCustomizable: boolean;
  customizationLabel: string | null;
  variants?: ProductVariant[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [customization, setCustomization] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          setNotFound(true);
          return;
        }
        const data = await response.json();
        setProduct(data);

        // Auto-select first variant if available and show its images
        if (data.variants && data.variants.length > 0) {
          const firstVariant = data.variants[0];
          setSelectedVariant(firstVariant);
          // Show first variant's image if it has images, otherwise fall back to product images
          const initialImage = firstVariant.images?.[0] || data.images?.[0];
          if (initialImage) setSelectedImage(initialImage);
        } else if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
    if (currentStock === 0) return;
    const safeQuantity = Math.min(quantity, currentStock);

    const cartImage = selectedVariant?.images?.[0] || product.images?.[0] || "/placeholder.png";

    addItem({
      id: product.id,
      name: product.name,
      price: selectedVariant?.price || product.price,
      image: cartImage,
      quantity: safeQuantity,
      customization: product.isCustomizable ? customization : undefined,
      selectedColor: selectedVariant?.color || undefined,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} ${selectedVariant ? `(${selectedVariant.color}) ` : ""}has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;

    const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
    if (currentStock === 0) return;
    const safeQuantity = Math.min(quantity, currentStock);

    const cartImage = selectedVariant?.images?.[0] || product.images?.[0] || "/placeholder.png";

    addItem({
      id: product.id,
      name: product.name,
      price: selectedVariant?.price || product.price,
      image: cartImage,
      quantity: safeQuantity,
      customization: product.isCustomizable ? customization : undefined,
      selectedColor: selectedVariant?.color || undefined,
    });

    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="container py-10 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg bg-muted animate-pulse" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          </div>
          {/* Details skeleton */}
          <div className="space-y-6">
            <div>
              <div className="h-6 w-24 bg-muted animate-pulse rounded mb-2" />
              <div className="h-9 w-3/4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-8 w-28 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-px bg-muted" />
            <div className="space-y-2">
              <div className="h-5 w-full bg-muted animate-pulse rounded" />
              <div className="h-5 w-5/6 bg-muted animate-pulse rounded" />
              <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-12 w-full bg-muted animate-pulse rounded" />
            <div className="h-12 w-full bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        <Button className="mt-6" onClick={() => router.push("/products")}>Browse Products</Button>
      </div>
    );
  }

  // Show only the selected variant's images, or fall back to product images
  const currentGalleryImages = selectedVariant && selectedVariant.images.length > 0
    ? selectedVariant.images
    : (product.images || []);

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted group">
            <Image
              src={selectedImage || currentGalleryImages[0] || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <WishlistButton productId={product.id} className="absolute top-4 right-4 scale-125" />
          </div>
          {currentGalleryImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {currentGalleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${selectedImage === image ? "border-primary" : "border-transparent hover:border-muted-foreground"
                    }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold">
              ₹{(selectedVariant?.price || product.price).toFixed(2)}
            </p>
            {(selectedVariant ? selectedVariant.stock : product.stock) === 0 && (
              <Badge variant="destructive" className="mt-2 text-sm">
                Out of Stock
              </Badge>
            )}
          </div>

          <Separator />

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="mb-3 font-semibold text-sm">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      // Switch to the new variant's first image, or product's first image
                      setSelectedImage(variant.images?.[0] || product.images?.[0] || "");
                      // Reset quantity if it exceeds new variant's stock
                      if (quantity > variant.stock) setQuantity(Math.max(1, variant.stock));
                    }}
                    className={`
                        relative px-4 py-2 rounded-md border text-sm font-medium transition-all
                        ${selectedVariant?.id === variant.id
                        ? "border-primary bg-primary/10 text-primary ring-2 ring-primary ring-offset-2"
                        : "border-muted hover:border-foreground/50 text-muted-foreground hover:text-foreground"
                      }
                      `}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-2 font-semibold">Description</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{product.description}</p>
          </div>

          {product.isCustomizable && (
            <Card>
              <CardContent className="p-4">
                <Label htmlFor="customization">
                  {product.customizationLabel || "Add your personal touch"}
                </Label>
                <Input
                  id="customization"
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const stock = selectedVariant ? selectedVariant.stock : product.stock;
                  setQuantity(Math.max(1, Math.min(stock, parseInt(e.target.value) || 1)));
                }}
                className="w-20 text-center"
                min="1"
                max={selectedVariant ? selectedVariant.stock : product.stock}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(selectedVariant ? selectedVariant.stock : product.stock, quantity + 1))}
                disabled={quantity >= (selectedVariant ? selectedVariant.stock : product.stock)}
              >
                +
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Stock: {(selectedVariant ? selectedVariant.stock : product.stock) > 0 ? `${(selectedVariant ? selectedVariant.stock : product.stock)} available` : "Out of stock"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full"
              disabled={(selectedVariant ? selectedVariant.stock : product.stock) === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              disabled={(selectedVariant ? selectedVariant.stock : product.stock) === 0}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <SimilarProducts currentProductId={product.id} currentProductName={product.name} category={product.category} />

      <Reviews productId={product.id} />
    </div>
  );
}
