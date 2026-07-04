import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Build where clause
    const whereClause: Prisma.ProductWhereInput = {};

    if (category && category !== "ALL") {
      whereClause.category = category as any;
    }

    const limit = searchParams.get("limit");

    const products = await prisma.product.findMany({
      where: whereClause,
      take: limit ? parseInt(limit) : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        variants: {
          orderBy: {
            color: "asc",
          },
        },
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
