import { RootState } from "@/redux/store";
import { Extra, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  uniqueKey: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  selectedSize?: Size;
  selectedExtras?: Extra[];
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const normalizeExtras = (extras?: Extra[]) =>
  (extras ?? [])
    .map((e) => e.id)
    .sort()
    .join("-");

const generateUniqueKey = (
  productId: string,
  size?: Size,
  extras?: Extra[]
) => {
  const extrasKey = (extras ?? [])
    .map((e) => e.id)
    .sort()
    .join("-");
  return `${productId}_${size?.id ?? "no-size"}_${extrasKey}`;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.uniqueKey === newItem.uniqueKey
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.uniqueKey !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ uniqueKey: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.uniqueKey === action.payload.uniqueKey
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;
