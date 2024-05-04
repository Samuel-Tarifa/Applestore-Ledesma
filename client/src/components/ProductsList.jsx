import {useProducts} from '../hooks/useProducts'
import ProductCard from './ProductCard'

const ProductsList=()=>{
  const {products}=useProducts()
  return (
      <section className='flex flex-col items-center'>
        <div className="grid product-list gap-4 w-full max-w-6xl">
          {products?.map(product=>(
            <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            />
          ))}
        </div>
      </section>
  )
}

export default ProductsList