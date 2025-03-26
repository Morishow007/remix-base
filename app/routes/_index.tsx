import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import type { MetaFunction } from "@remix-run/node";
import {
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { CardProduct } from "../components/card-product";
import Pagination from "../components/pagination";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { useCart } from "../context/CartContext";
import {
  getAllCategories,
  getProducts,
  getProductsByCategories,
} from "../models/products.server";
import { Product } from "../types/product";

export const meta: MetaFunction = () => {
  return [
    { title: "The Online Store" },
    { name: "description", content: "Welcome to the Online Store" },
  ];
};

const sortOptions = [
  { value: "price", label: "Price Low to High" },
  { value: "id", label: "Price High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "title", label: "Name" },
];

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const sortBy = url.searchParams.get("sortBy") || "id";
  const order = url.searchParams.get("order") || "asc";

  const productData = await getProducts(limit, skip, sortBy, order);
  const categories = await getAllCategories();

  const selectedCategories = url.searchParams.getAll("category");
  let productsByCategory: Product[] = [];

  if (selectedCategories.length > 0) {
    productsByCategory = await getProductsByCategories(selectedCategories);
  }

  const total = productsByCategory.length || productData.total;

  const maxPages = Math.ceil(total / limit);
  if (page > maxPages) {
    url.searchParams.set("page", "1");
    return redirect(url.toString());
  }

  return {
    products: productData.products,
    categories,
    productsByCategory,
    page,
    total,
  };
};

export default function HomePage() {
  const { products, categories, productsByCategory, page, total } =
    useLoaderData<typeof loader>();

  const { addToCart } = useCart();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category")
  );

  const transition = useNavigation();
  const isLoading = transition.state === "loading";

  //TODO: TOGGLE CATEGORIES IN MOBILE

  const totalPages = Math.ceil(total / 10);

  const productsToDisplay = selectedCategories.length
    ? productsByCategory.slice((page - 1) * 10, page * 10)
    : products;

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const initialDisplayCount = 6;
  const categoriesToShow = showAllCategories
    ? filteredCategories
    : filteredCategories.slice(0, initialDisplayCount);

  const toggleCategory = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (selectedCategories.includes(category)) {
      const updatedCategories = selectedCategories.filter(
        (item) => item !== category
      );
      newSearchParams.delete("category");
      updatedCategories.forEach((item) =>
        newSearchParams.append("category", item)
      );
    } else {
      newSearchParams.append("category", category);
    }

    newSearchParams.set("page", "1");

    setSearchParams(newSearchParams);

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
    alert("Added to cart!");
    addToCart(currentProduct);
  };

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative">
              <select
                className="appearance-none border rounded-md py-2 pl-3 pr-10 bg-white cursor-pointer"
                onChange={(e) => setSearchParams({ sortBy: e.target.value })}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {productsToDisplay.length > 0 ? (page - 1) * 10 + 1 : 0}-
              {productsToDisplay.length > 0 ? Math.min(page * 10, total) : 0} of{" "}
              {total} products
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <LoaderIcon className="animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {productsToDisplay.map((product) => (
                <CardProduct
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}

          {!isLoading && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        <div className="w-full md:w-64 md:ml-8 mb-6 md:mb-0 order-first md:order-last">
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Categories</h2>
              <Button className="md:hidden text-sm text-primary">Toggle</Button>
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
              <Button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="bg-gray-100 mt-3 text-sm text-primary hover:underline flex items-center justify-center w-full"
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
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
