"use client";

import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/store/useWishlist";

interface WishlistButtonProps {
    productId: string;
    className?: string; // Allow positioning
}

export default function WishlistButton({ productId, className }: WishlistButtonProps) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const router = useRouter();

    const { wishlistedIds, fetchWishlist, isFetching, hasFetched, toggleItem } = useWishlist();
    const isWishlisted = wishlistedIds.includes(productId);

    useEffect(() => {
        if (session && !hasFetched && !isFetching) {
            fetchWishlist();
        }
    }, [session, hasFetched, isFetching, fetchWishlist]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent linking to product page if button is on a card
        e.stopPropagation();

        if (!session) {
            toast({
                title: "Please sign in",
                description: "You need to be signed in to save items.",
                variant: "destructive",
            });
            router.push("/auth/signin");
            return;
        }

        // Optimistic UI update handled by store

        try {
            const finalState = await toggleItem(productId);
            
            toast({
                title: finalState ? "Added to Wishlist" : "Removed from Wishlist",
                description: finalState
                    ? "This item has been saved for later."
                    : "This item has been removed from your list.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    if (session && !hasFetched) {
        return <div className="h-9 w-9 bg-muted/50 rounded-full animate-pulse z-10" />; // Placeholder size
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm z-10 transition-all", className)}
            onClick={toggleWishlist}
        >
            <Heart
                className={cn("h-5 w-5 transition-colors",
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                )}
            />
            <span className="sr-only">Add to wishlist</span>
        </Button>
    );
}
