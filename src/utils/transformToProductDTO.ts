import type { TypeProduct } from "../@types/productType";
import type { ProductDto } from "../dto/userDto";

export const transformToProductDTO = (
  product: TypeProduct | null
): ProductDto => {
  if (!product || typeof product !== "object") {
    throw new Error("Invalid user data");
  }

  console.log("entrou aqui no trans", product);
  return {
    _id: product._id,
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
  };
};
