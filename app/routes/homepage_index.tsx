import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CardProduct } from "../components/card-product";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { useCart } from "../context/CartContext";
import { getProducts } from "../models/products.server";

export const meta: MetaFunction = () => {
  return [
    { title: "The Online Store" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const products = await getProducts();
  return products;
};

export default function HomePage() {
  const products = useLoaderData<typeof loader>();
  const { addToCart, cart } = useCart();

  return (
    <main className="container  py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative">
            <select className="appearance-none border rounded-md py-2 pl-3 pr-10 bg-white cursor-pointer">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Popular</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing 1-9 of 100
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        <div className="w-full md:w-64 md:ml-8 mt-8 md:mt-0 order-first md:order-last">
          <div className="border rounded-md p-4">
            <h2 className="font-medium mb-4">Categories</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="category-1" />
                <label htmlFor="category-1" className="text-sm cursor-pointer">
                  Category 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-2" />
                <label htmlFor="category-2" className="text-sm cursor-pointer">
                  Category 2
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-3" />
                <label htmlFor="category-3" className="text-sm cursor-pointer">
                  Category 3
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-4" />
                <label htmlFor="category-4" className="text-sm cursor-pointer">
                  Category 4
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={() => console.log(cart)}>Console log cart</Button>
    </main>
  );
}
