import { Button } from "@/components/ui/button";
import { useLoaderData } from "@remix-run/react";
import { StarRating } from "../components/star-rating";
import { useCart } from "../context/CartContext";
import { getProductById } from "../models/products.server";

export const loader = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(params.id);
  return { product };
};
export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 aspect-square w-full">
            <img
              src={product?.images?.[0] ?? "https://dummyimage.com/336x336"}
              alt={product?.title ?? "Product image"}
              width={600}
              height={600}
              className="object-scale-down w-full h-full border-rounded"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 justify-start">
              <h1 className="text-2xl font-medium ">{product?.title}</h1>
              {product?.rating !== undefined && (
                <div className="flex items-center gap-2">
                  <StarRating rating={product.rating} />
                  <span className="text-sm text-gray-600">
                    ({product.rating})
                  </span>
                </div>
              )}
            </div>
            <p className="text-2xl font-bold mb-6">{product?.price} €</p>

            <Button
              className="w-full bg-slate-800 hover:bg-slate-700 text-white mb-8"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <div className="border-t pt-6">
              <h2 className="font-medium mb-4">{product?.description}</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
