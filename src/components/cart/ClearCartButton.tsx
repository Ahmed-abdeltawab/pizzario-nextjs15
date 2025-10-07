"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/fearures/cart/cartSlice";

const ClearCartButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-[0.5em] border-destructive text-destructive cursor-pointer hover:text-destructive-foreground"
          style={{ fontSize: "1em" }}
        >
          <Trash2 className="w-[1.25em] h-[1.25em]" />
          <span className="hidden sm:inline">Clear Cart</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent style={{ fontSize: "1rem" }}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[1.5em] font-bold">
            Clear Shopping Cart?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[1em] text-muted-foreground">
            This action will remove all items from your cart. This cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-[1em]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClearCart}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[1em]"
          >
            Clear Cart
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearCartButton;
