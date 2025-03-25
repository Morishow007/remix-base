import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { CardProduct } from "../components/card-product";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { useCart } from "../context/CartContext";
import { getAllCategories, getProducts } from "../models/products.server";
import { Product } from "../types/product";

export const meta: MetaFunction = () => {
  return [
    { title: "The Online Store" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const products = await getProducts();
  const categories = await getAllCategories();
  return { products, categories };
};

export default function HomePage() {
  const { products, categories } = useLoaderData<typeof loader>();
  const { addToCart, cart } = useCart();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const initialDisplayCount = 6;
  const categoriesToShow = showAllCategories
    ? filteredCategories
    : filteredCategories.slice(0, initialDisplayCount);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAddToCart = (currentProduct: Product) => {
    addToCart(currentProduct);
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-8 space-x-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-md border hover:bg-muted">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border bg-primary text-primary-foreground">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border hover:bg-muted">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border hover:bg-muted">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border hover:bg-muted">
              4
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border hover:bg-muted">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-64 md:ml-8 mb-6 md:mb-0 order-first md:order-last">
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Categories</h2>
              <button className="md:hidden text-sm text-primary">Toggle</button>
            </div>

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search categories..."
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full"
              />
            </div>

            {selectedCategories.length > 0 && (
              <div className="mb-4 pb-3 border-b">
                <h3 className="text-sm font-medium mb-2">Selected</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <div
                      key={category}
                      className="bg-gray-200 text-primary text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      {formatCategoryName(category)}
                      <button
                        onClick={() => toggleCategory(category)}
                        className="ml-1 hover:text-primary/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {categoriesToShow.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No categories found
                </p>
              ) : (
                categoriesToShow.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {formatCategoryName(category)}
                    </label>
                  </div>
                ))
              )}
            </div>

            {filteredCategories.length > initialDisplayCount && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="mt-3 text-sm text-primary hover:underline flex items-center justify-center w-full"
              >
                {showAllCategories ? (
                  <>
                    <span>Show less</span>
                    <ChevronUpIcon className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    <span>Show all ({filteredCategories.length})</span>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
