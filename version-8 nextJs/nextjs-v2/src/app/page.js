import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {

  const response = await fetch("https://dummyjson.com/products?limit=9")
  const data = await response.json()
  console.log(data);
  


  return (
    <div>
      
      <div style={{display:"flex", flexWrap:"wrap", gap:"10px"}}>
        {data.products.map(product => (
          <div key={product} style={{marginBottom:"10px", width:"25%"}}>
            <p>{product.title}</p>
            <img src={product.images[0]} width={150} height={100} />
            <p style={{width:"270px"}}>{product.description}</p>
            <p>{product.price}</p>
          
          
          </div>
        ))}
      </div>


    </div>
  );
}
