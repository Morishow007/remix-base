"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { CartProductCart } from "../components/cart-product-cart";
import { useCart } from "../context/CartContext";
import { useToast } from "../hooks/use-toast";

export const loader = async () => {
  return null;
};

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, activatePromoCode, checkCart } =
    useCart();
  const { toast } = useToast();

  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const discounts = cart.reduce((acc, item) => {
    if (item.activePromoCode) {
      const discountAmount = item.product.discountPercentage
        ? ((item.product.price * item.product.discountPercentage) / 100) *
          item.quantity
        : 0;
      return acc + discountAmount;
    }
    return acc;
  }, 0);

  const shipping = 10;
  const total = subtotal - discounts + shipping;

  const handleApplyPromoCode = (sku: string) => {
    const product = cart.find((item) => item.product.sku === sku);
    if (product) {
      if (product.activePromoCode) {
        toast({
          title: "Promo code already applied!",
          duration: 3000,
          variant: "default",
        });
      } else {
        activatePromoCode(product.product.id);
        toast({
          title: "Promo code applied!",
          duration: 3000,
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Invalid promo code!",
        duration: 3000,
        variant: "default",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-1440px">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <Link to="/">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button className="bg-slate-800 hover:bg-slate-700 text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <CartProductCart key={item.product.id} product={item} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-80">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Cart Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>

              {discounts > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discounts</span>
                  <span>-{discounts.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)} €</span>
              </div>

              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            <Button
              className="w-full bg-slate-800 hover:bg-slate-700 mb-4 text-white"
              onClick={() => checkCart()}
            >
              Check out
            </Button>

            <div className="text-center text-sm text-gray-600 mb-4">
              Or pay with PayPal
            </div>

            <div className="border-t pt-4">
              <div className="text-sm mb-2">Promo code</div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1"
                  onChange={(e) => setPromoCode(e.target.value.toString())}
                />
                <Button
                  variant="outline"
                  className="bg-slate-800 text-white hover:bg-slate-700"
                  onClick={() => handleApplyPromoCode(promoCode)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
