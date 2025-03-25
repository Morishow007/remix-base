import { Product } from "../types/product";

export async function getProducts(
  limit = 10,
  skip = 0
): Promise<Array<Product>> {
  const data = await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .catch((err) => {
      return err;
    });

  return data.products;
}

export async function getProductById(id: string): Promise<Product> {
  const data = await fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      return err;
    });

  return data;
}

export async function getAllCategories(): Promise<Array<string>> {
  const data = await fetch("https://dummyjson.com/products/category-list")
    .then((res) => res.json())
    .catch((err) => {
      return err;
    });

  return data;
}
