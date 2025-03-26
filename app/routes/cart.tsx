"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@remix-run/react";
import { PercentIcon, ShieldCheck, Tag, Trash2, TruckIcon } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export const loader = async () => {
  return null;
};

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, activatePromoCode, checkCart } =
    useCart();

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
    const productId = cart.find((item) => item.product.sku === sku)?.product.id;
    if (productId) {
      activatePromoCode(productId);
      alert("Promo code applied!");
    } else {
      alert("Invalid promo code!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
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
                <div key={item.product.id} className="border-b pb-6">
                  <div className="flex gap-4">
                    <div className="bg-gray-100 w-32 h-32 flex-shrink-0">
                      <img
                        src={
                          item.product?.images?.[0] ??
                          "https://dummyimage.com/128x128"
                        }
                        alt={item.product?.title || "Product image"}
                        width={128}
                        height={128}
                        className="w-full h-full object-scale-down"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.product.title}</h3>

                          <div className="text-right">
                            {item.activePromoCode &&
                            item.product.discountPercentage > 0 ? (
                              <>
                                <div className="flex justify-end items-center gap-1 text-green-600 text-sm">
                                  <PercentIcon className="h-3 w-3" />
                                  <span>
                                    {item.product.discountPercentage.toFixed(0)}
                                    % off
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-red-600 line-through">
                                    {item.product.price.toFixed(2)} €
                                  </span>

                                  <span className="font-medium">
                                    {(
                                      item.product.price *
                                      (1 -
                                        item.product.discountPercentage / 100)
                                    ).toFixed(2)}{" "}
                                    €
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {item.product.price.toFixed(2)} €
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.product.brand && (
                            <Badge variant="outline" className="text-xs">
                              {item.product.brand}
                            </Badge>
                          )}
                          {item.activePromoCode && (
                            <Badge
                              variant="outline"
                              className="text-xs flex items-center gap-1"
                            >
                              <Tag className="h-3 w-3" />
                              SKU: {item.product.sku}
                            </Badge>
                          )}
                          {item.product.availabilityStatus && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                              {item.product.availabilityStatus}
                            </Badge>
                          )}
                        </div>

                        {item.product.shippingInformation && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <TruckIcon className="h-3 w-3" />
                            {item.product.shippingInformation}
                          </p>
                        )}
                        {item.product.returnPolicy && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            {item.product.returnPolicy}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <div className="flex items-center border rounded-md">
                            <Button
                              className="w-8 h-8 flex items-center justify-center border-r"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 h-8 flex items-center justify-center">
                              {item.quantity}
                            </span>
                            <Button
                              className="w-8 h-8 flex items-center justify-center border-l"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              disabled={
                                item.quantity >= (item.product.stock || 99)
                              }
                            >
                              +
                            </Button>
                          </div>

                          {item.product.stock && (
                            <span className="text-xs text-gray-500 ml-2">
                              {item.product.stock} available
                            </span>
                          )}
                        </div>

                        <Button
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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
