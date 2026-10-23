import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {
  
  const response = await fetch(process.env.PRODUCT_API_URL + "products?limit=9")
  const data = await response.json()
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
