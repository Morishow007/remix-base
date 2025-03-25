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
      <div className="grid gap-4 p-4">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <img
            src={product?.images?.[0] ?? "https://dummyimage.com/336x336"}
            alt={product?.title ?? "Product image"}
            width="336"
            height="336"
            className="aspect-[4/5] object-cover border w-full"
          />
        </div>
        <div className="grid gap-1.5">
          <h3 className="font-semibold text-sm md:text-base line-clamp-2">
            {product?.title ?? "Unknown Product"}
          </h3>
          <p className="font-semibold text-sm md:text-base">
            {product?.price !== undefined
              ? `$${product.price.toFixed(2)}`
              : "Price not available"}{" "}
          </p>
        </div>
        <Button size="sm" onClick={onAddToCart}>
          Add to cart
        </Button>
      </div>
    </Card>
  );
};
