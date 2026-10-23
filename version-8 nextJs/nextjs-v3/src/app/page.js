import Image from "next/image";
import styles from "./page.module.css";
import { getAllProducts } from "./src/services/productService";

export default async function Home() {
  
  
  const data = await getAllProducts()
  console.log(data);
  

  return (
    
    <div >
      
      {data.products.map((product, index) => (
        <div key={index}>
          <p>{product.title}</p>
        </div>
      ))}


    </div>
  );
}
