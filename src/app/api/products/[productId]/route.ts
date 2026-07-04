import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> } // ✅ Changed to Promise
) {
  try {
    // ✅ Await params first
    const { productId } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: {
          orderBy: {
            color: "asc",
          },
        },
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
