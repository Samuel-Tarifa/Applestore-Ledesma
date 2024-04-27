import {useProducts} from '../hooks/useProducts'
import ProductCard from './ProductCard'

const ProductsList=()=>{
  const {products}=useProducts()
  return (
    <main>
      <section>
        <h2>Productos</h2>
        <div className="grid product-list gap-4">
          {products?.map(product=>(
            <ProductCard
            key={product.idDrink}
            name={product.strDrink}
            image={product.strDrinkThumb}
            price={product.idDrink}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default ProductsList