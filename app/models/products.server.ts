import { Product } from "../types/product";

export async function getProducts(
  limit = 10,
  skip = 0
): Promise<Array<Product>> {
  console.log("Fetching products...");
  const data = await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .catch((err) => {
      return err;
    });

  return data.products;
}
