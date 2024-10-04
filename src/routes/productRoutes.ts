import { Router } from "express";
import productController from "../web/productController";

const router = Router();

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProductById);
router.post("/create", productController.createProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.post("/products/:productId/view", productController.registerView);
router.post(
  "/products/:productId/purchase-click",
  productController.registerPurchaseClick
);

export default router;
