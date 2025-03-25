import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { Product } from "../types/product";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CardProductProps {
  product: Product;
  onAddToCart: () => void;
}

export const CardProduct = ({ product, onAddToCart }: CardProductProps) => {
  return (
    <Card key={product.id} className="w-full max-w-xs rounded-xl border width">
      <div className="flex flex-col h-full gap-4 p-4">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <img
            src={product?.images?.[0] ?? "https://dummyimage.com/336x336"}
            alt={product?.title ?? "Product image"}
            width="336"
            height="336"
            className="aspect-[4/5] object-scale-down border w-full"
          />
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold text-sm md:text-base line-clamp-2 h-[3.2rem]">
            <Link
              key={`link-${product.id}`}
              to={`/product/${product?.id}`}
              className="font-inter font-normal text-[15px] leading-[20px] tracking-[0%] hover:underline"
            >
              {product?.title ?? "Unknown Product"}
            </Link>
          </h3>
          <p className="font-semibold text-sm md:text-base">
            {product?.price !== undefined
              ? `€${product.price.toFixed(2)}`
              : "Price not available"}{" "}
          </p>
        </div>

        {/* TODO: Additional feature - Add to wishlist */}

        <Button
          size="sm"
          variant={"default"}
          onClick={onAddToCart}
          className="mt-auto bg-[#1f3044] text-white hover:bg-gray-500 active:bg-black"
        >
          Add to cart
          <ShoppingCartIcon className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </Card>
  );
};
