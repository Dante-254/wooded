export type ProductStatus = "available" | "sold" | "reserved" | "in-progress";

export type ProductType = "Chopping Board" | "Key Hanger" | "Other";

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  status: ProductStatus;
  price: number;
  note: string;
  dateSold?: string;
  images?: string[];
}

export const products: Product[] = [];
