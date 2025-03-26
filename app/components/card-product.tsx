"use client";

import { Link } from "@remix-run/react";
import { EyeIcon, ShoppingCartIcon } from "lucide-react";
import type { Product } from "../types/product";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CardProductProps {
  product: Product;
  onAddToCart: () => void;
}

export const CardProduct = ({ product, onAddToCart }: CardProductProps) => {
  return (
    <Card key={product.id} className="w-full max-w-xs rounded-xl border h-full">
      <div className="flex flex-col h-full gap-4 p-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
          <Link
            key={`link-${product.id}`}
            to={`/product/${product?.id}`}
            className="block h-full"
          >
            <img
              src={product?.images?.[0] ?? "https://dummyimage.com/336x336"}
              alt={product?.title ?? "Product image"}
              width="336"
              height="336"
              className="aspect-[4/5] object-scale-down border w-full h-full transition-transform hover:scale-105"
            />
          </Link>
          {product?.rating && (
            <Badge className="absolute top-2 right-2 bg-white text-black hover:bg-gray-100">
              {product.rating} ★
            </Badge>
          )}
        </div>

        <div className="flex flex-col ">
          <h3 className="font-semibold text-sm md:text-base line-clamp-1 h-[1.5rem]">
            <Link
              key={`link-${product.id}`}
              to={`/product/${product?.id}`}
              className="font-inter font-normal text-[15px] leading-[20px] tracking-[0%] hover:underline"
            >
              {product?.title ?? "Unknown Product"}
            </Link>
          </h3>
          <p className="font-semibold text-sm md:text-base mt-2">
            {product?.price !== undefined
              ? `${product.price.toFixed(2)} €`
              : "Price not available"}{" "}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="border-[#1f3044] text-[#1f3044] hover:bg-[#1f3044] hover:text-white"
          >
            <Link to={`/product/${product?.id}`}>
              <EyeIcon className="h-4 w-4 mr-1" />
              Details
            </Link>
          </Button>

          <Button
            size="sm"
            variant="default"
            onClick={onAddToCart}
            className="bg-[#1f3044] text-white hover:bg-gray-700 active:bg-black"
          >
            <ShoppingCartIcon className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
