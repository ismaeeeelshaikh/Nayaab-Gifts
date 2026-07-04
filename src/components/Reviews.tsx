"use client";

import { useEffect, useState } from "react";
import { Star, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/ImageUpload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
    id: string;
    rating: number;
    comment: string;
    images: string[];
    createdAt: string;
    userId: string; // Added userId to check ownership
    user: {
        name: string | null;
        image: string | null;
    };
}

interface ReviewsProps {
    productId: string;
}

export default function Reviews({ productId }: ReviewsProps) {
    const { data: session } = useSession();
    const { toast } = useToast();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/products/${productId}/reviews`);
                if (!response.ok) throw new Error("Failed to fetch reviews");
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    const startEditing = (review: Review) => {
        setEditingReviewId(review.id);
        setRating(review.rating);
        setComment(review.comment);
        setImages(review.images);
        setShowForm(true);

        // Scroll to form
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const cancelEdit = () => {
        setEditingReviewId(null);
        setRating(0);
        setComment("");
        setImages([]);
        setShowForm(false);
    };

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            const response = await fetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed");

            setReviews(reviews.filter(r => r.id !== reviewId));
            toast({ title: "Review deleted" });
        } catch (error) {
            toast({ title: "Error deleting review", variant: "destructive" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast({
                title: "Rating required",
                description: "Please select a star rating.",
                variant: "destructive",
            });
            return;
        }
        if (!comment.trim()) {
            toast({
                title: "Comment required",
                description: "Please write a review.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            let response;
            let newReview: Review;

            if (editingReviewId) {
                // UPDATE existing review
                response = await fetch(`/api/reviews/${editingReviewId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rating, comment, images }),
                });

                if (!response.ok) throw new Error("Failed to update review");
                newReview = await response.json();

                // Update list
                setReviews(reviews.map(r => r.id === editingReviewId ? newReview : r));
                toast({ title: "Review updated!" });

            } else {
                // CREATE new review
                response = await fetch(`/api/products/${productId}/reviews`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rating, comment, images }),
                });

                if (!response.ok) throw new Error("Failed to submit review");
                newReview = await response.json();

                setReviews([newReview, ...reviews]);
                toast({ title: "Review submitted!" });
            }

            // Reset Form
            cancelEdit();

        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const averageRating = reviews.length
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : "0.0";

    return (
        <div className="space-y-8 mt-12 border-t pt-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center text-yellow-500">
                            <Star className="w-5 h-5 fill-current" />
                            <span className="ml-1 font-semibold text-lg">{averageRating}</span>
                        </div>
                        <span className="text-muted-foreground">({reviews.length} reviews)</span>
                    </div>
                </div>

                {session && !showForm && !reviews.some(r => r.userId === session.user?.id) && (
                    <Button onClick={() => setShowForm(true)}>Write a Review</Button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-muted/30 p-6 rounded-lg space-y-4 border">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{editingReviewId ? "Edit Your Review" : "Write a Review"}</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`focus:outline-none transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                >
                                    <Star className={`w-8 h-8 ${star <= rating ? "fill-current" : ""}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Review</label>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us what you liked about this product..."
                            className="resize-none"
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Add Photos (Optional)</label>
                        <ImageUpload
                            value={images}
                            onChange={(urls) => setImages(urls)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : (editingReviewId ? "Update Review" : "Submit Review")}
                        </Button>
                        <Button type="button" variant="ghost" onClick={cancelEdit}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to write one!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0 group">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={review.user.image || ""} />
                                    <AvatarFallback>{review.user.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">{review.user.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">
                                                {format(new Date(review.createdAt), "MMM d, yyyy")}
                                            </span>
                                            {/* Edit/Delete Actions for Owner */}
                                            {session?.user?.id === review.userId && (
                                                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => startEditing(review)}>
                                                        <Pencil className="h-3 w-3" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-600" onClick={() => handleDelete(review.id)}>
                                                        <Trash className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex text-yellow-500 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-200 fill-none"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-foreground leading-relaxed">{review.comment}</p>

                                    {review.images.length > 0 && (
                                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                            {review.images.map((img, idx) => (
                                                <div key={idx} className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden border">
                                                    <Image src={img} alt="Review photo" fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
