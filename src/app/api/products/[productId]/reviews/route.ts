import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: Fetch all reviews for a product
export async function GET(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const { productId } = await params;

        const reviews = await prisma.review.findMany({
            where: {
                productId: productId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("[REVIEWS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// POST: Create a new review
export async function POST(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { productId } = await params;
        const body = await request.json();
        const { rating, comment, images } = body;

        if (!rating || rating < 1 || rating > 5) {
            return new NextResponse("Invalid rating", { status: 400 });
        }

        if (!comment) {
            return new NextResponse("Comment is required", { status: 400 });
        }

        // Check if user has already reviewed this product
        const existingReview = await prisma.review.findFirst({
            where: {
                productId: productId,
                userId: session.user.id,
            },
        });

        if (existingReview) {
            return new NextResponse("You have already reviewed this product. You can edit your existing review instead.", { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                images: images || [],
                productId: productId,
                userId: session.user.id,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("[REVIEW_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
