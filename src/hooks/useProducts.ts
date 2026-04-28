// import { useState } from 'react'
// import { products as initialProducts } from '../data/products'
// import type { Product } from '../data/products'
// export const useProducts = () => {
//   const [products, setProducts] = useState<Product[]>(initialProducts ?? [])

//   const addProduct = (newProduct: Omit<Product, 'id'>) => {
//     const product = {
//       id: Math.max(...products.map(p => p.id)) + 1,
//       ...newProduct,
//     }
//     setProducts([...products, product])
//   }

//   return { products, addProduct }
// }