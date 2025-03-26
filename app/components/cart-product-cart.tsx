import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PercentIcon, ShieldCheck, Tag, Trash2, TruckIcon } from "lucide-react";
import { CartProduct, useCart } from "../context/CartContext";

interface CartProductCartProps {
  product: CartProduct;
}

export const CartProductCart = ({ product }: CartProductCartProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <>
      <div className="border-b pb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-gray-100 w-32 h-32 flex-shrink-0">
            <img
              src={
                product.product?.images?.[0] ?? "https://dummyimage.com/128x128"
              }
              alt={product.product?.title || "Product image"}
              width={128}
              height={128}
              className="w-full h-full object-scale-down"
            />
          </div>

          <div className="flex flex-col flex-1 justify-between">
            <div>
              <div className="flex justify-between">
                <h3 className="font-medium">{product.product.title}</h3>
                <div className="text-right">
                  {product.activePromoCode &&
                  product.product.discountPercentage > 0 ? (
                    <>
                      <div className="flex justify-end items-center gap-1 text-green-600 text-sm">
                        <PercentIcon className="h-3 w-3" />
                        <span>
                          {product.product.discountPercentage.toFixed(0)}% off
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-red-600 line-through">
                          {product.product.price.toFixed(2)} €
                        </span>
                        <span className="font-medium">
                          {(
                            product.product.price *
                            (1 - product.product.discountPercentage / 100)
                          ).toFixed(2)}{" "}
                          €
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {product.product.price.toFixed(2)} €
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-1">
                {product.product.brand && (
                  <Badge variant="outline" className="text-xs">
                    {product.product.brand}
                  </Badge>
                )}
                {product.activePromoCode && (
                  <Badge
                    variant="outline"
                    className="text-xs flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    SKU: {product.product.sku}
                  </Badge>
                )}
                {product.product.availabilityStatus && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                    {product.product.availabilityStatus}
                  </Badge>
                )}
              </div>
              {product.product.shippingInformation && (
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <TruckIcon className="h-3 w-3" />
                  {product.product.shippingInformation}
                </p>
              )}
              {product.product.returnPolicy && (
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  {product.product.returnPolicy}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <div className="flex items-center border rounded-md">
                  <Button
                    className="w-8 h-8 flex items-center justify-center border-r"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      updateQuantity(
                        product.product.id,
                        Math.max(1, product.quantity - 1)
                      )
                    }
                    disabled={product.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 h-8 flex items-center justify-center">
                    {product.quantity}
                  </span>
                  <Button
                    className="w-8 h-8 flex items-center justify-center border-l"
                    aria-label="Increase quantity"
                    onClick={() =>
                      updateQuantity(product.product.id, product.quantity + 1)
                    }
                    disabled={product.quantity >= (product.product.stock || 99)}
                  >
                    +
                  </Button>
                </div>
                {product.product.stock && (
                  <span className="text-xs text-gray-500 ml-2">
                    {product.product.stock} available
                  </span>
                )}
              </div>

              <Button
                className="text-gray-500 hover:text-gray-700"
                aria-label="Remove product"
                onClick={() => removeFromCart(product.product.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
