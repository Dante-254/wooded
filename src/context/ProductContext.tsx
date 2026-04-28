// import { products as initialProducts, type Product } from '../data/products'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { type Product } from "../data/products";

interface ProductContextType {
  products: Product[];
  addProduct: (newProduct: Omit<Product, "id">) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (newProduct: Omit<Product, "id">) => {
    await addDoc(collection(db, "products"), newProduct);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used inside ProductProvider");
  return context;
};
