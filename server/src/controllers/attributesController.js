import db from '../db.js'

const attributesController={
  getAll:async(req,res)=>{
    try {
      const attributes=await db.attribute.findMany()
      res.json(attributes)
    } catch (error) {
      console.error(error)
      res.status(500).json({message:error.message})
    }
  }
}

export default attributesController