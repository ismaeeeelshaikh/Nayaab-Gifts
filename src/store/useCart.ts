import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization?: string;
  selectedColor?: string;
}

// Generate a unique key for each cart item based on product id + color + customization
function getCartItemKey(item: { id: string; selectedColor?: string; customization?: string }): string {
  return `${item.id}_${item.selectedColor || ""}_${item.customization || ""}`;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, selectedColor?: string, customization?: string) => void;
  updateQuantity: (id: string, quantity: number, selectedColor?: string, customization?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const itemKey = getCartItemKey(item);
        const existingItem = items.find((i) => getCartItemKey(i) === itemKey);

        if (existingItem) {
          set({
            items: items.map((i) =>
              getCartItemKey(i) === itemKey
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 }],
          });
        }
      },

      removeItem: (id, selectedColor, customization) => {
        const key = getCartItemKey({ id, selectedColor, customization });
        set({ items: get().items.filter((i) => getCartItemKey(i) !== key) });
      },

      updateQuantity: (id, quantity, selectedColor, customization) => {
        if (quantity <= 0) {
          get().removeItem(id, selectedColor, customization);
          return;
        }
        const key = getCartItemKey({ id, selectedColor, customization });
        set({
          items: get().items.map((i) =>
            getCartItemKey(i) === key ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
