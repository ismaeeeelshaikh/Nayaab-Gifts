import prisma from "@/lib/prisma";
import { Metadata } from "next";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        name: true,
        description: true,
        images: true,
        category: true,
      },
    });

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The product you are looking for does not exist.",
      };
    }

    return {
      title: `${product.name} | UM Enterprise`,
      description: product.description.slice(0, 160),
      openGraph: {
        title: product.name,
        description: product.description.slice(0, 160),
        images: product.images?.[0] ? [product.images[0]] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description.slice(0, 160),
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch {
    return {
      title: "Product | UM Enterprise",
      description: "View product details",
    };
  }
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return <>{children}</>;
}
