import db from '../db.js'

const products=[]

const createProducts=async()=>{
  try {
    const productsCreated=await db.product.createMany({data:products})
    console.log('Products created successfully')
    return productsCreated
  } catch (error) {
    console.error(error)
  }
}

console.log(createProducts)