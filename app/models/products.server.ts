import { Product, ProductResponse } from "../types/product";

export async function getProducts(
  limit = 10,
  skip = 0
): Promise<ProductResponse> {
  const data = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    {
      headers: {
        "Cache-Control": "max-age=900, public",
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      return err;
    });

  return data;
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

export async function getProductsByCategories(
  categories: string[]
): Promise<Array<Product>> {
  const requests = categories.map((category) =>
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => data.products)
      .catch(() => [])
  );

  const results = await Promise.all(requests);
  return results.flat();
}
