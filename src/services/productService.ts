import type { TypeProduct } from "../@types/productType";
import type { ProductDto } from "../dto/userDto";
import Product from "../models/productModel";
import User from "../models/userModel";
import { transformToProductDTO } from "../utils/transformToProductDTO";

class ProductService {
  async getAll() {
    const product = (await Product.find().lean()) as unknown as TypeProduct[];

    if (!product) {
      return null;
    }
    return product.map((o) => transformToProductDTO(o));
  }

  async findById(id: string) {
    const product = (await Product.findById(
      id,
      {},
      { lean: true }
    )) as TypeProduct | null;

    if (!product) {
      return null;
    }
    const productDTO = transformToProductDTO(product);
    return productDTO;
  }

  async add(product: ProductDto) {
    const productCreated = (await Product.create(
      product
    )) as unknown as TypeProduct | null;

    if (!productCreated) {
      return null;
    }
    const productDTO = transformToProductDTO(productCreated);
    return productDTO;
  }

  async deleteById(id: string) {
    const productDeleted = (await Product.findByIdAndDelete(
      id
    )) as TypeProduct | null;

    if (!productDeleted) {
      return null;
    }
    const productDTO = transformToProductDTO(productDeleted);
    return productDTO;
  }

  async registerView(productId: string, userId: string) {
    const product = await Product.findById(productId);
    const user = await User.findById(userId).lean();

    if (!product || !user) {
      return null;
    }

    product.views = product.views || [];
    product.views.push({ userId, viewedAt: new Date() });

    await product.save();

    return user;
  }

  async registerPurchaseClick(productId: string, userId: string) {
    const product = await Product.findById(productId);
    const user = await User.findById(userId).lean();

    if (!product || !user) {
      return null;
    }

    product.purchaseClicks = product.purchaseClicks || [];
    product.purchaseClicks.push({ userId, clickedAt: new Date() });

    await product.save();

    return user;
  }
}

export default new ProductService();
