import { create } from 'zustand';

interface WishlistStore {
    wishlistedIds: string[];
    isFetching: boolean;
    hasFetched: boolean;
    fetchWishlist: () => Promise<void>;
    toggleItem: (productId: string) => Promise<boolean>; // returns new state
}

export const useWishlist = create<WishlistStore>((set, get) => ({
    wishlistedIds: [],
    isFetching: false,
    hasFetched: false,

    fetchWishlist: async () => {
        if (get().isFetching || get().hasFetched) return;
        
        set({ isFetching: true });
        try {
            // Using the batch API endpoint without productIds which should return all wishlisted items
            // Wait, the API I wrote requires productIds for batch, or returns single if productId.
            // Actually, I can just fetch the whole wishlist for the user. Let's update the API for that.
            const response = await fetch('/api/user/wishlist/check?all=true');
            if (response.ok) {
                const data = await response.json();
                set({ wishlistedIds: data.wishlistedIds || [], hasFetched: true });
            }
        } catch (error) {
            console.error('Failed to fetch wishlist', error);
        } finally {
            set({ isFetching: false });
        }
    },

    toggleItem: async (productId: string) => {
        const { wishlistedIds } = get();
        const isCurrentlyWishlisted = wishlistedIds.includes(productId);
        const newState = !isCurrentlyWishlisted;

        // Optimistic update
        if (newState) {
            set({ wishlistedIds: [...wishlistedIds, productId] });
        } else {
            set({ wishlistedIds: wishlistedIds.filter(id => id !== productId) });
        }

        try {
            const response = await fetch('/api/user/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) throw new Error('Failed to toggle wishlist');
            
            const data = await response.json();
            
            // Sync with server state just in case
            if (data.isWishlisted && !newState) {
                 set({ wishlistedIds: [...get().wishlistedIds, productId] });
            } else if (!data.isWishlisted && newState) {
                 set({ wishlistedIds: get().wishlistedIds.filter(id => id !== productId) });
            }
            return data.isWishlisted;
        } catch (error) {
            // Revert optimistic update
            if (isCurrentlyWishlisted) {
                set({ wishlistedIds: [...get().wishlistedIds, productId] });
            } else {
                set({ wishlistedIds: get().wishlistedIds.filter(id => id !== productId) });
            }
            throw error;
        }
    }
}));
