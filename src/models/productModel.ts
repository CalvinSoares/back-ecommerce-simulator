import mongoose, { Schema, type Document } from "mongoose";

export interface ProductView {
  userId: string;
  viewedAt: Date;
}

export interface PurchaseClick {
  userId: string;
  clickedAt: Date;
}

export interface TypeProduct extends Document {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  views?: ProductView[];
  purchaseClicks?: PurchaseClick[];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  views: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      viewedAt: { type: Date, default: Date.now },
    },
  ],
  purchaseClicks: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      clickedAt: { type: Date, default: Date.now },
    },
  ],
});

const Product = mongoose.model<TypeProduct>("Product", ProductSchema);
export default Product;
