"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
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
          notFound();
        }
        const data = await response.json();
        setProduct(data);

        let initialImages = data.images;

        // Auto-select first variant if available
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }

        if (initialImages && initialImages.length > 0) {
          setSelectedImage(initialImages[0]);
        }
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: selectedVariant?.price || product.price, // Use variant price if available
      image: selectedVariant ? selectedVariant.images[0] : product.images[0],
      quantity,
      customization: product.isCustomizable ? customization : undefined,
      selectedColor: selectedVariant?.color || undefined, // Add selected color
    });

    toast({
      title: "Added to cart",
      description: `${product.name} ${selectedVariant ? `(${selectedVariant.color}) ` : ""}has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: selectedVariant?.price || product.price,
      image: selectedVariant ? selectedVariant.images[0] : product.images[0],
      quantity,
      customization: product.isCustomizable ? customization : undefined,
      selectedColor: selectedVariant?.color || undefined,
    });

    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const currentGalleryImages = Array.from(
    new Set([
      ...(product.images || []),
      ...(selectedVariant?.images || [])
    ])
  );

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <Image
              src={selectedImage || currentGalleryImages[0] || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
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
                      if (variant.images.length > 0) {
                        setSelectedImage(variant.images[0]);
                      }
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
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
