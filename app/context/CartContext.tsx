import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";

interface CartProduct {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  checkCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    const newCart = cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    if (!newCart.some((item) => item.product.id === product.id)) {
      newCart.push({
        product,
        quantity: 1,
      });
    }

    setCart(newCart);
  };

  const removeFromCart = (productId: number) => {
    const newCart = cart.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(newCart.filter((item) => item.quantity > 0));
  };

  const checkCart = () => {
    console.log("Current cart:", cart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, checkCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
