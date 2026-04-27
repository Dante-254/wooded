export type ProductStatus = "available" | "sold" | "reserved" | "in-progress";

export type ProductType = "Chopping Board" | "Key Hanger" | "Other";

export interface Product {
  id: number;
  name: string;
  type: ProductType;
  status: ProductStatus;
  price: number;
  note: string;
  dateSold?: string; // the ? means this field is optional
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chopping Board #1",
    type: "Chopping Board",
    status: "available",
    price: 850,
    note: ""
  },
  {
    id: 2,
    name: "Chopping Board #2",
    type: "Chopping Board",
    status: "sold",
    price: 850,
    note: ""

  },
  {
    id: 3,
    name: "Key Hanger #1",
    type: "Key Hanger",
    status: "reserved",
    price: 400,
    note: ""
  },
  {
    id: 4,
    name: "Key Hanger #2",
    type: "Key Hanger",
    status: "available",
    price: 400,
    note: ""
  },
  {
    id: 5,
    name: "Chopping Board #3",
    type: "Chopping Board",
    status: "available",
    price: 850,
    note: ""
  },
];
