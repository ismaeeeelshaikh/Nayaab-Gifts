import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ isWishlisted: false, wishlistedIds: [] });
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");
        const productIds = searchParams.get("productIds"); // Batch support: comma-separated IDs
        const fetchAll = searchParams.get("all") === "true"; // Fetch all wishlist items

        // Fetch all items mode
        if (fetchAll) {
            const wishlistEntries = await prisma.wishlist.findMany({
                where: { userId: session.user.id },
                select: { productId: true },
            });
            const wishlistedIds = wishlistEntries.map(w => w.productId);
            return NextResponse.json({ wishlistedIds });
        }

        // Batch mode: check multiple products at once
        if (productIds) {
            const ids = productIds.split(",").filter(Boolean);
            const wishlistEntries = await prisma.wishlist.findMany({
                where: {
                    userId: session.user.id,
                    productId: { in: ids },
                },
                select: { productId: true },
            });
            const wishlistedIds = wishlistEntries.map(w => w.productId);
            return NextResponse.json({ wishlistedIds });
        }

        // Single mode: backward compatible
        if (!productId) {
            return new NextResponse("Product ID required", { status: 400 });
        }

        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId,
                },
            },
        });

        return NextResponse.json({ isWishlisted: !!existing });
    } catch (error) {
        console.error("[WISHLIST_CHECK]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
