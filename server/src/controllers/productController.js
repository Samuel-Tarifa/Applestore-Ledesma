import db from '../db.js'

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await db.product.findMany();
      res.json(products);
      
    } catch (error) {
      console.error(error)
      res.status(500).json({message:error.message})
    }
  },
  create:async (req,res)=>{
    try {
      const newProduct=await db.product.create({data:req.body})
      res.json(newProduct)
    } catch (error) {
      console.error(error)
      res.status(500).json({message:error.message})
    }
  }
};

export default productController;
