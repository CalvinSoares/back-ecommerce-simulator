import type { Request, Response } from "express";
import productService from "../services/productService";

interface AuthRequest extends Request {
  user?: { id: string };
}

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const product = await productService.getAll();
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Error get all Product", error: err });
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await productService.findById(id);

      if (!product) {
        res.status(404).json({ message: "product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Error search product", error: err });
    }
  }

  async createProduct(req: Request, res: Response) {
    const product = req.body;
    try {
      const productCreated = await productService.add(product);
      res.status(201).json(productCreated);
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar pedido", error: err });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const productDeleted = await productService.deleteById(id);
      if (!productDeleted) {
        res.status(404).json({ message: "product not found" });
      }
      res.status(200).json(productDeleted);
    } catch (err) {
      res.status(500).json({ message: "Error deleting product", error: err });
    }
  }

  async registerView(req: AuthRequest, res: Response) {
    const { productId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    try {
      const user = await productService.registerView(productId, userId);

      if (!user) {
        res.status(404).json({ message: "Produto ou usuário não encontrado" });
      }

      res.status(200).json({ message: "Visualização registrada", user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro ao registrar visualização", error: err });
    }
  }

  async registerPurchaseClick(req: AuthRequest, res: Response) {
    const { productId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    try {
      const user = await productService.registerPurchaseClick(
        productId,
        userId
      );

      if (!user) {
        res.status(404).json({ message: "Produto ou usuário não encontrado" });
      }

      res.status(200).json({ message: "Clique de compra registrado", user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro ao registrar clique de compra", error: err });
    }
  }
}

export default new ProductController();
