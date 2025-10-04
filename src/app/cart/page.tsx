"use client";

import React, { useState } from "react";
import {
  CartHeader,
  CartItemsList,
  CartSummary,
  CheckoutForm,
  EmptyState,
} from "@/components/cart";
import { selectCartItems } from "@/redux/fearures/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";

// Mock cart items data (UI only - no real logic)
const mockCartItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella and basil",
    price: 12.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    size: "Large",
    extras: ["Extra Cheese", "Olives"],
  },
  {
    id: "2",
    name: "Cheeseburger",
    description: "Juicy beef patty with melted cheese and fresh vegetables",
    price: 8.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    size: "Medium",
    extras: ["Bacon", "Pickles"],
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with creamy Caesar dressing",
    price: 7.49,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    size: "Regular",
    extras: ["Grilled Chicken"],
  },
];

export default function CartPage() {
  // Mock state for demo purposes (UI only)
  const cartItems = useAppSelector(selectCartItems);
  const isEmpty = cartItems.length === 0;

  // Calculate totals (UI only - mock calculations)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 5.99;
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-background">
      <CartHeader />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div
          className="container mx-auto px-[1.5em] py-[3em] max-w-[90rem]"
          style={{ fontSize: "1rem" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2em]">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-2 space-y-[1.5em]">
              <div>
                <h2 className="text-[1.75em] font-bold text-foreground mb-[0.5em]">
                  Your Items ({cartItems.length})
                </h2>
                <p className="text-[1em] text-muted-foreground">
                  Review your items before checkout
                </p>
              </div>
              <CartItemsList items={cartItems} />
            </div>

            {/* Right Column: Summary & Checkout */}
            <div className="lg:col-span-1 space-y-[1.5em]">
              <div className="sticky top-[2em]">
                <CartSummary
                  subtotal={subtotal}
                  delivery={delivery}
                  total={total}
                />
              </div>
            </div>
          </div>

          {/* Checkout Form Section */}
          <div className="mt-[3em]">
            <CheckoutForm />
          </div>
        </div>
      )}
    </main>
  );
}
